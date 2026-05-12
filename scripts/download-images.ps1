# Downloads placeholder imagery for TrainHub Institute into public/images/.
# Sources:
#   - picsum.photos  : Lorem Picsum (real Unsplash photos, seeded for stability)
#   - i.pravatar.cc  : Pravatar faces for testimonials
#   - api.dicebear.com: DiceBear initials SVGs for partner logos
$ProgressPreference = "SilentlyContinue"
$ErrorActionPreference = "Stop"

function Get-File($url, $out) {
    if (Test-Path $out) { Write-Host "skip   $out" -ForegroundColor DarkGray; return }
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 60
    Write-Host "ok     $out  ($url)" -ForegroundColor Green
}

# ---- Courses (13) -----------------------------------------------------------
$courses = @(
    "data-analytics-with-power-bi",
    "project-management-professional-prep",
    "monitoring-evaluation-and-learning",
    "financial-management-for-ngos",
    "gis-and-spatial-analysis-with-qgis",
    "field-epidemiology-and-disease-surveillance",
    "agricultural-extension-and-advisory-services",
    "grant-proposal-writing-and-fundraising",
    "introduction-to-machine-learning-with-python",
    "leadership-and-strategic-management",
    "construction-project-management",
    "cybersecurity-fundamentals",
    "human-resources-for-modern-workplaces"
)
foreach ($slug in $courses) {
    Get-File "https://picsum.photos/seed/$slug/1200/800" "public/images/courses/$slug.jpg"
}

# ---- Blog posts (6) ---------------------------------------------------------
$posts = @(
    "five-power-bi-mistakes",
    "agile-vs-predictive-pmp",
    "writing-better-indicators",
    "ngo-budget-revisions",
    "qgis-or-arcgis",
    "outbreak-investigation-checklist"
)
foreach ($slug in $posts) {
    Get-File "https://picsum.photos/seed/$slug/1200/800" "public/images/blog/$slug.jpg"
}

# ---- About images -----------------------------------------------------------
Get-File "https://picsum.photos/seed/trainhub-about/1000/800" "public/images/about/training.jpg"
Get-File "https://picsum.photos/seed/trainhub-team/1000/800"  "public/images/about/team.jpg"

# ---- Testimonial avatars (3) -----------------------------------------------
$avatars = @(
    @{ slug = "a-mwangi"; seed = "A. Mwangi" },
    @{ slug = "r-patel";  seed = "R. Patel"  },
    @{ slug = "l-okeke";  seed = "L. Okeke"  }
)
foreach ($a in $avatars) {
    $url = "https://i.pravatar.cc/240?u=" + [uri]::EscapeDataString($a.seed)
    Get-File $url "public/images/avatars/$($a.slug).jpg"
}

# ---- Partner logos (6) - DiceBear initials SVGs -----------------------------
$logos = @(
    @{ slug = "ministry-of-health";            seed = "Ministry of Health" },
    @{ slug = "regional-development-bank";     seed = "Regional Development Bank" },
    @{ slug = "international-ngo-network";     seed = "International NGO Network" },
    @{ slug = "national-statistics-office";    seed = "National Statistics Office" },
    @{ slug = "energy-sector-group";           seed = "Energy Sector Group" },
    @{ slug = "higher-education-council";      seed = "Higher Education Council" }
)
foreach ($l in $logos) {
    $seed = [uri]::EscapeDataString($l.seed)
    $url = "https://api.dicebear.com/9.x/initials/svg?seed=$seed&backgroundType=gradientLinear&backgroundColor=0ea5e9,1d4ed8,0284c7&fontWeight=700&radius=10"
    Get-File $url "public/images/logos/$($l.slug).svg"
}

Write-Host ""
Write-Host "Done. Files in public/images/:" -ForegroundColor Cyan
Get-ChildItem public/images -Recurse -File | ForEach-Object {
    "{0,8} bytes  {1}" -f $_.Length, $_.FullName.Substring((Resolve-Path public).Path.Length + 1)
}
