Add-Type -AssemblyName System.Drawing

$inputPath = "d:\valo\KKN Project\KKN Project\assets\logo.png"
$outputPath = "d:\valo\KKN Project\KKN Project\assets\logo_clean.png"

if (-not (Test-Path $inputPath)) {
    Write-Error "Input file not found: $inputPath"
    exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Original Dimensions: $width x $height"

# 1. Find bounding box of actual logo content
$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Content is non-transparent and non-white
        if ($pixel.A -gt 20 -and (-not ($pixel.R -gt 240 -and $pixel.G -gt 240 -and $pixel.B -gt 240))) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Raw Content Box: MinX=$minX, MaxX=$maxX, MinY=$minY, MaxY=$maxY"

# Add padding around content
$padding = 8
$minX = [Math]::Max(0, $minX - $padding)
$minY = [Math]::Max(0, $minY - $padding)
$maxX = [Math]::Min($width - 1, $maxX + $padding)
$maxY = [Math]::Min($height - 1, $maxY + $padding)

$cropWidth = $maxX - $minX + 1
$cropHeight = $maxY - $minY + 1

Write-Host "Cropped Dimensions: $cropWidth x $cropHeight (Zoomed In)"

# 2. Create new bitmap with 32bpp ARGB for perfect transparency
$result = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropHeight; $y++) {
    for ($x = 0; $x -lt $cropWidth; $x++) {
        $origX = $minX + $x
        $origY = $minY + $y
        $pixel = $bmp.GetPixel($origX, $origY)

        $a = $pixel.A
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B

        if ($a -lt 10 -or ($r -gt 242 -and $g -gt 242 -and $b -gt 242)) {
            # Completely transparent background pixel
            $newColor = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
        }
        elseif ($r -gt 215 -and $g -gt 215 -and $b -gt 215) {
            # Feather edge pixels for smooth antialiasing against white
            $minVal = [Math]::Min($r, [Math]::Min($g, $b))
            $calcAlpha = [int]($a * (255 - $minVal) / (255 - 215))
            if ($calcAlpha -gt 255) { $calcAlpha = 255 }
            if ($calcAlpha -lt 0) { $calcAlpha = 0 }
            
            $newColor = [System.Drawing.Color]::FromArgb($calcAlpha, $r, $g, $b)
        }
        else {
            # Logo foreground
            $newColor = [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
        }

        $result.SetPixel($x, $y, $newColor)
    }
}

$bmp.Dispose()

# Save cleaned image
$result.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$result.Dispose()

Write-Host "Successfully processed, cropped & removed background! Saved to $outputPath"
