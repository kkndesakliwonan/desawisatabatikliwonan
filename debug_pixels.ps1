Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile('d:\valo\KKN Project\KKN Project\assets\logo.png')
Write-Host "Pixel 0,0: R=$($b.GetPixel(0,0).R) G=$($b.GetPixel(0,0).G) B=$($b.GetPixel(0,0).B) A=$($b.GetPixel(0,0).A)"
Write-Host "Pixel 500,50: R=$($b.GetPixel(500,50).R) G=$($b.GetPixel(500,50).G) B=$($b.GetPixel(500,50).B) A=$($b.GetPixel(500,50).A)"
Write-Host "Pixel 512,360: R=$($b.GetPixel(512,360).R) G=$($b.GetPixel(512,360).G) B=$($b.GetPixel(512,360).B) A=$($b.GetPixel(512,360).A)"
$b.Dispose()
