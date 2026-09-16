param(
    [Parameter(Mandatory = $true)]
    [string]$Token,

    [string]$Owner = 'mhamadrebae-pixel',
    [string]$Repo = 'kogay-rasty',
    [string]$Branch = 'main'
)

$ErrorActionPreference = 'Stop'

$Headers = @{
    Authorization = "Bearer $Token"
    Accept        = 'application/vnd.github+json'
    'X-GitHub-Api-Version' = '2022-11-28'
    'User-Agent'  = 'kogay-rasty-online-deploy'
}

$OnlineDir = $PSScriptRoot

function Publish-File {
    param([string]$FilePath)
    
    $fileName = [System.IO.Path]::GetFileName($FilePath)
    $repoPath = "online-system/$fileName"
    $uri = "https://api.github.com/repos/$Owner/$Repo/contents/$repoPath"
    
    $sha = $null
    try {
        $getRes = Invoke-RestMethod -Method Get -Uri "$uri`?ref=$Branch" -Headers $Headers
        $sha = $getRes.sha
    } catch {}

    $bytes = [System.IO.File]::ReadAllBytes($FilePath)
    $body = @{
        message = "Update $repoPath"
        content = [Convert]::ToBase64String($bytes)
        branch  = $Branch
    }
    if ($sha) { $body.sha = $sha }

    Invoke-RestMethod -Method Put -Uri $uri -Headers ($Headers + @{ 'Content-Type' = 'application/json' }) -Body ($body | ConvertTo-Json -Depth 5 -Compress) | Out-Null
    Write-Host "Published $repoPath"
}

$files = Get-ChildItem -Path $OnlineDir -File | Where-Object { $_.Extension -ne '.ps1' }
Write-Host "Deploying online-system ($($files.Count) files) to GitHub..."

foreach ($f in $files) {
    Publish-File -FilePath $f.FullName
}

Write-Host "Done! Your online system is live at: https://$Owner.github.io/$Repo/online-system/store.html"
Write-Host "Admin is live at: https://$Owner.github.io/$Repo/online-system/admin.html"
