// Content Locker Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contentLockerModal');
    const closeBtn = document.querySelector('.close');
    const contentLockerTriggers = document.querySelectorAll('.content-locker-trigger');
    
    // Open modal when mod links are clicked
    contentLockerTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modName = this.getAttribute('data-mod');
            openContentLocker(modName);
        });
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Handle unlock button clicks
    const unlockBtns = document.querySelectorAll('.unlock-btn');
    unlockBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleUnlockAction(this);
        });
    });
    
    // CTA Button Analytics (for tracking clicks)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            trackCTAButtonClick(this);
        });
    });
});

// Open content locker modal
function openContentLocker(modName) {
    const modal = document.getElementById('contentLockerModal');
    const modalTitle = modal.querySelector('h2');
    
    // Update modal title with mod name
    modalTitle.textContent = `Unlock ${modName.replace('-', ' ').toUpperCase()} Mod!`;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track content locker view
    trackContentLockerView(modName);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('contentLockerModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle unlock actions
function handleUnlockAction(button) {
    const buttonType = button.classList.contains('survey-btn') ? 'survey' : 
                      button.classList.contains('app-btn') ? 'app_download' : 'newsletter';
    
    // Track unlock action
    trackUnlockAction(buttonType);
    
    // Simulate action completion (replace with actual CPA offer integration)
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        // Simulate successful completion
        button.textContent = 'Completed!';
        button.style.background = '#27ae60';
        
        // Show download link after completion
        setTimeout(() => {
            showDownloadLink();
        }, 1000);
    }, 2000);
}

// Show download link after completion
function showDownloadLink() {
    const modalContent = document.querySelector('.modal-content');
    const lockerOptions = document.querySelector('.locker-options');
    
    // Hide locker options
    lockerOptions.style.display = 'none';
    
    // Create download section
    const downloadSection = document.createElement('div');
    downloadSection.className = 'download-section';
    downloadSection.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle" style="color: #27ae60; font-size: 48px; margin-bottom: 20px;"></i>
            <h3 style="color: #27ae60; margin-bottom: 15px;">Access Granted!</h3>
            <p style="color: #666; margin-bottom: 25px;">Your mod is ready for download. Click the button below to get started!</p>
            <a href="#" class="download-btn" style="
                display: inline-block;
                background: #3498db;
                color: #fff;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
            ">Download Mod Now</a>
        </div>
    `;
    
    // Add download section to modal
    modalContent.appendChild(downloadSection);
    
    // Handle download button click
    const downloadBtn = downloadSection.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        trackDownloadClick();
        // Here you would redirect to actual download or show download instructions
        alert('Download started! Check your downloads folder.');
    });
}

// Analytics and Tracking Functions
function trackContentLockerView(modName) {
    // Track content locker view for analytics
    console.log(`Content locker viewed for: ${modName}`);
    
    // Here you would integrate with your analytics platform
    // Example: Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'content_locker_view', {
            'event_category': 'engagement',
            'event_label': modName
        });
    }
}

function trackUnlockAction(actionType) {
    // Track unlock action for analytics
    console.log(`Unlock action completed: ${actionType}`);
    
    // Here you would integrate with your analytics platform
    if (typeof gtag !== 'undefined') {
        gtag('event', 'unlock_action', {
            'event_category': 'conversion',
            'event_label': actionType
        });
    }
}

function trackCTAButtonClick(button) {
    // Track CTA button clicks for analytics
    const buttonText = button.textContent.trim();
    console.log(`CTA button clicked: ${buttonText}`);
    
    // Here you would integrate with your analytics platform
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_button_click', {
            'event_category': 'engagement',
            'event_label': buttonText
        });
    }
}

function trackDownloadClick() {
    // Track download clicks for analytics
    console.log('Download button clicked');
    
    // Here you would integrate with your analytics platform
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download_click', {
            'event_category': 'conversion'
        });
    }
}

// Enhanced User Experience Features
function addHoverEffects() {
    // Add smooth hover effects to mod entries
    const modEntries = document.querySelectorAll('.mod-entry');
    
    modEntries.forEach(entry => {
        entry.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        entry.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    
    // Add loading animation for images (disabled to prevent disappearing)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Keep images visible by default - no opacity animation
        img.style.opacity = '1';
        img.style.transition = 'none';
    });
});

// Play Mod Function
function playMod(modName) {
    // Track play button click
    trackPlayButtonClick(modName);
    
    // Show content locker for the specific mod
    openContentLocker(modName);
}

// Track Play Button Clicks
function trackPlayButtonClick(modName) {
    console.log(`Play button clicked for: ${modName}`);
    
    // Here you would integrate with your analytics platform
    if (typeof gtag !== 'undefined') {
        gtag('event', 'play_button_click', {
            'event_category': 'engagement',
            'event_label': modName
        });
    }
}

// Mobile Optimization
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Adjust grid layout for mobile
        const modsGrid = document.querySelector('.mods-grid');
        if (modsGrid) {
            modsGrid.style.gridTemplateColumns = '1fr';
        }
        
        // Optimize modal for mobile
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.margin = '10% auto';
            modalContent.style.width = '95%';
        }
    }
}

// Call mobile optimization on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Performance Optimization
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}

// Pagination Variables
let currentPage = 1;
const itemsPerPage = 6;
const totalMods = 28;
const totalPages = Math.ceil(totalMods / itemsPerPage);

// Initialize pagination
document.addEventListener('DOMContentLoaded', function() {
    initializePagination();
    showPage(1); // Show first page with 6 mods
});

// Initialize pagination controls
function initializePagination() {
    const modEntries = document.querySelectorAll('.mod-entry');
    
    // Hide mods beyond the first page from the start
    modEntries.forEach((entry, index) => {
        if (index >= itemsPerPage) {
            entry.style.display = 'none';
        }
    });
    
    updatePaginationInfo();
    updatePaginationButtons();
    updatePageNumbers();
}

// Show specific page
function showPage(page) {
    const modEntries = document.querySelectorAll('.mod-entry');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Hide all mod entries
    modEntries.forEach((entry, index) => {
        if (index >= startIndex && index < endIndex) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
    
    currentPage = page;
    updatePaginationInfo();
    updatePaginationButtons();
    updatePageNumbers();
}

// Change page (next/previous)
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        showPage(newPage);
    }
}

// Go to specific page
function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        showPage(page);
    }
}



// Update pagination info
function updatePaginationInfo() {
    const startRange = (currentPage - 1) * itemsPerPage + 1;
    const endRange = Math.min(currentPage * itemsPerPage, totalMods);
    
    // Always show current page range since pagination is always enabled
    document.getElementById('currentRange').textContent = `${startRange}-${endRange}`;
    document.getElementById('totalMods').textContent = totalMods;
}

// Update pagination buttons
function updatePaginationButtons() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Update page number buttons
function updatePageNumbers() {
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';
    
    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Adjust start and end to always show 5 pages when possible
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + 4);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
}
