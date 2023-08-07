# Uninstallers

## Dell Optimizer

Intune requires both an install and uninstall command. Our command is the same for both, and will always UNINSTALL, even if you set this to "Required" in Intune.  

Install Command:  
```
powershell.exe -executionpolicy bypass .\ExecuteScript.ps1 -ScriptFilePath "Uninstallers/main/UninstallDellOptimizer.ps1" -AppName "DellOptimizer"
```

Uninstall Command:  
```
powershell.exe -executionpolicy bypass .\ExecuteScript.ps1 -ScriptFilePath "Uninstallers/main/UninstallDellOptimizer.ps1" -AppName "DellOptimizer"
```

Detection Rule:  
```
MSI {4EA9855C-3339-4AE3-977B-6DF8A369469D}
```
