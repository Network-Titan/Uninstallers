# Remove McAfee
This uses the MCPR tool, documented better here - https://github.com/j0shbl0ck/Intune_Deployment/tree/master/App%20Configurations/McAfee/McAfee%20Removal

# Examples

Use the McAfeeRemover.intunewin  

Install command:  
```
powershell.exe -executionpolicy bypass .\McAfeeRemover.ps1
```

Uninstall command:  
```
powershell.exe -executionpolicy bypass .\McAfeeRemover.ps1
```

Detection Method:  
Registry  
Key Path: ```HKEY_LOCAL_MACHINE\SOFTWARE\McAfee```  
Detection Method: ```Key does not exist```
