// ===== Dark Mode Toggle =====
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (html.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
    updateDarkModeIcon();
});

// Initialize icon on load
updateDarkModeIcon();


// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
    sidebar.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    sidebar.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        closeNav();
    } else {
        openNav();
    }
});

navOverlay.addEventListener('click', closeNav);

// Close nav on link click (mobile)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            closeNav();
        }
    });
});

// Close nav on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && sidebar.classList.contains('open')) {
        closeNav();
    }
});


// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = window.innerWidth <= 900 ? 56 : 0; // Account for mobile header
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ===== BibTeX Download =====
const downloadBibtexBtn = document.getElementById('downloadBibtex');

if (downloadBibtexBtn) {
    downloadBibtexBtn.addEventListener('click', () => {
        const publications = document.querySelectorAll('.publication-card[data-bibtex]');
        let bibtexContent = '';

        publications.forEach(pub => {
            const bibtex = pub.getAttribute('data-bibtex');
            if (bibtex) {
                // Decode HTML entities
                const decoded = bibtex
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#34;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&#x27;/g, "'")
                    .replace(/&#x2F;/g, '/')
                    .replace(/&apos;/g, "'")
                    .replace(/&#10;/g, '\n');
                bibtexContent += decoded + '\n\n';
            }
        });

        if (bibtexContent) {
            const blob = new Blob([bibtexContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'publications.bib';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('No BibTeX entries found.');
        }
    });
}


// ===== Active Navigation Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');

function updateActiveNav() {
    let current = '';
    const offset = window.innerWidth <= 900 ? 100 : 50;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);


// ===== OpenAlex Integration (Optional) =====
// Uncomment and configure to fetch publications from OpenAlex
/*
async function fetchOpenAlexPublications(orcids) {
    const publications = [];

    for (const orcid of orcids) {
        try {
            const response = await fetch(
                `https://api.openalex.org/works?filter=author.orcid:${orcid}&sort=publication_date:desc&per_page=50`
            );
            const data = await response.json();

            if (data.results) {
                data.results.forEach(work => {
                    publications.push({
                        title: work.title,
                        authors: work.authorships.map(a => a.author.display_name).join(', '),
                        venue: work.primary_location?.source?.display_name || 'Unknown',
                        year: work.publication_year,
                        doi: work.doi?.replace('https://doi.org/', ''),
                        type: work.type === 'journal-article' ? 'journal' :
                              work.type === 'proceedings-article' ? 'conference' : 'preprint'
                    });
                });
            }
        } catch (error) {
            console.error(`Error fetching publications for ORCID ${orcid}:`, error);
        }
    }

    // Remove duplicates by DOI
    const unique = publications.filter((pub, index, self) =>
        index === self.findIndex(p => p.doi === pub.doi)
    );

    return unique.sort((a, b) => b.year - a.year);
}

// Usage: Call with array of ORCIDs
// fetchOpenAlexPublications(['0000-0003-3507-2851']).then(pubs => console.log(pubs));
*/
