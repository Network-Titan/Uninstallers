#!ps


$Paths=(Get-MpPreference).ExclusionPath
foreach ($Path in $Paths) { Remove-MpPreference -ExclusionPath $Path }