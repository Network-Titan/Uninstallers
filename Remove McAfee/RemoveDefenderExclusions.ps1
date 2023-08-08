#!ps

$Paths=(Get-MpPreference).ExclusionPath
foreach ($Path in $Paths) { Remove-MpPreference -ExclusionPath $Path }

$Processes=(Get-MpPreference).ExclusionProcess 
foreach ($Path in $Paths) { Remove-MpPreference -ExclusionProcess $Processes }
