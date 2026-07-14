// =====================================================================
// LÓGICA DE FILTRADO MÚLTIPLE DE PROYECTOS
// =====================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.viewport-section');
const btnAll = document.querySelector('.filter-btn[data-filter="all"]');

let activeFilters = new Set();

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');

            if (filter === 'all') {
                activeFilters.clear();
                filterBtns.forEach(b => b.classList.remove('active'));
                btnAll.classList.add('active');
            } else {
                if (activeFilters.has(filter)) {
                    activeFilters.delete(filter);
                    btn.classList.remove('active');
                } else {
                    activeFilters.add(filter);
                    btn.classList.add('active');
                }

                if (activeFilters.size > 0) {
                    btnAll.classList.remove('active');
                } else {
                    btnAll.classList.add('active');
                }
            }
            updateSections();
        });
    });
}

function updateSections() {
    if (activeFilters.size === 0) {
        sections.forEach(sec => {
            sec.style.display = 'block';
        });
    } else {
        sections.forEach(sec => {
            if (activeFilters.has(sec.id)) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });
    }
}

// =====================================================================
// LAZY LOAD DE VIMEO (SECCIÓN VFX)
// =====================================================================
function loadVideo(button) {
    const container = button.closest('.video-container-vertical');
    if (!container) return;

    const iframe = container.querySelector('.lazy-iframe');
    if (!iframe) return;

    const videoSrc = iframe.getAttribute('data-src');
    if (videoSrc) {
        iframe.setAttribute('src', videoSrc);
    }
    
    container.classList.add('video-active');
}
