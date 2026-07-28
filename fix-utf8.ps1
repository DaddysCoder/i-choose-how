# Rewrites project text files as UTF-8 (no BOM).
# Run in PowerShell:  .\fix-utf8.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$files = @(
  "index.html",
  "css\styles.css",
  "js\app.js",
  "js\content.js",
  "js\modes.js",
  "README.md",
  "CONTENT.md",
  "LIMITATIONS.md",
  "deliver.ps1",
  "fix-utf8.ps1"
)

$utf8 = New-Object System.Text.UTF8Encoding $false

foreach ($rel in $files) {
  $path = Join-Path $root $rel
  if (-not (Test-Path $path)) {
    Write-Host "Skip missing: $rel"
    continue
  }

  $bytes = [System.IO.File]::ReadAllBytes($path)
  if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
    $text = [System.Text.Encoding]::Unicode.GetString($bytes, 2, $bytes.Length - 2)
    Write-Host "Converting UTF-16 LE BOM: $rel"
  }
  elseif ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
    $text = [System.Text.Encoding]::BigEndianUnicode.GetString($bytes, 2, $bytes.Length - 2)
    Write-Host "Converting UTF-16 BE BOM: $rel"
  }
  elseif ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes, 3, $bytes.Length - 3)
    Write-Host "Normalizing UTF-8 BOM: $rel"
  }
  elseif ($bytes.Length -ge 4 -and $bytes[1] -eq 0x00 -and $bytes[3] -eq 0x00) {
    $text = [System.Text.Encoding]::Unicode.GetString($bytes)
    Write-Host "Converting UTF-16 LE (no BOM): $rel"
  }
  else {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    Write-Host "Already looks like UTF-8: $rel (rewriting clean)"
  }

  [System.IO.File]::WriteAllText($path, $text, $utf8)
}

Write-Host ""
Write-Host "Done. Opening in your default browser..."
Start-Process (Join-Path $root "index.html")
Write-Host "If you still see code, right-click index.html -> Open with -> Microsoft Edge"
