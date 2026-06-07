param(
    [Parameter(Mandatory = $true)]
    [string]$Token,

    [string]$Owner = 'mhamadrebae-pixel',

    [string]$Repo = 'kogay-rasty',

    [string]$Branch = 'main',

    [string[]]$Targets = @(
        'admin.html',
        'index.html',
        'script.js',
        'sw.js',
        'admin.css',
        'style.css',
        'auth.js',
        'analytics.js',
        'githubProxy.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png',
        'products*.json'
    )
)

$ErrorActionPreference = 'Stop'

$Headers = @{
    Authorization = "Bearer $Token"
    Accept        = 'application/vnd.github+json'
    'X-GitHub-Api-Version' = '2022-11-28'
    'User-Agent'  = 'kogay-rasty-deploy-script'
}

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

function Convert-ToRepoPath {
    param([string]$FullPath)

    $relativePath = [System.IO.Path]::GetRelativePath($Root, $FullPath)
    return ($relativePath -replace '\\', '/')
}

function Convert-ToApiPath {
    param([string]$RepoPath)

    return (($RepoPath -split '/') | ForEach-Object { [uri]::EscapeDataString($_) }) -join '/'
}

function Get-RepoFileSha {
    param([string]$RepoPath)

    $encodedPath = Convert-ToApiPath $RepoPath
    $uri = "https://api.github.com/repos/$Owner/$Repo/contents/$encodedPath?ref=$Branch"

    try {
        $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $Headers
        return $response.sha
    } catch {
        $statusCode = $null
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        if ($statusCode -eq 404) {
            return $null
        }
        throw
    }
}

function Publish-RepoFile {
    param(
        [string]$LocalPath,
        [string]$RepoPath
    )

    $encodedPath = Convert-ToApiPath $RepoPath
    $uri = "https://api.github.com/repos/$Owner/$Repo/contents/$encodedPath"
    $sha = Get-RepoFileSha $RepoPath
    $bytes = [System.IO.File]::ReadAllBytes($LocalPath)
    $body = @{
        message = "Deploy $RepoPath"
        content = [Convert]::ToBase64String($bytes)
        branch  = $Branch
    }

    if ($sha) {
        $body.sha = $sha
    }

    Invoke-RestMethod `
        -Method Put `
        -Uri $uri `
        -Headers ($Headers + @{ 'Content-Type' = 'application/json' }) `
        -Body ($body | ConvertTo-Json -Depth 5 -Compress) | Out-Null

    Write-Host "Published $RepoPath"
}

function Get-DeployFiles {
    param([string[]]$Patterns)

    $items = foreach ($pattern in $Patterns) {
        $fullPattern = Join-Path $Root $pattern

        if ($pattern.IndexOfAny(@('*', '?', '[')) -ge 0) {
            Get-ChildItem -Path $fullPattern -File -ErrorAction SilentlyContinue
            continue
        }

        if (Test-Path $fullPattern -PathType Container) {
            Get-ChildItem -Path $fullPattern -Recurse -File
            continue
        }

        if (Test-Path $fullPattern -PathType Leaf) {
            Get-Item $fullPattern
            continue
        }

        Write-Warning "Skipping missing target: $pattern"
    }

    return $items | Sort-Object FullName -Unique
}

$files = Get-DeployFiles -Patterns $Targets

if (-not $files -or $files.Count -eq 0) {
    throw 'No files matched the requested deploy targets.'
}

Write-Host "Deploying $($files.Count) files to $Owner/$Repo ($Branch)..."

foreach ($file in $files) {
    $repoPath = Convert-ToRepoPath $file.FullName
    Publish-RepoFile -LocalPath $file.FullName -RepoPath $repoPath
}

Write-Host 'Deploy finished successfully.'
