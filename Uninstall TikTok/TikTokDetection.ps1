$TikTokAppX = Get-AppxPackage -Name BytedancePte.Ltd.TikTok

if ($TikTokAppX) {
    Write-Output 'TikTok App is installed'
    exit 0
}
else {
    Write-Output 'TikTok is not installed'
    exit 1
}