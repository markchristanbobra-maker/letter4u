// Navigation Buttons
const btnToConfession = document.getElementById('btn-to-confession');
const btnToQuestion = document.getElementById('btn-to-question');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// Sections
const sectionIntro = document.getElementById('section-intro');
const sectionConfession = document.getElementById('section-confession');
const sectionQuestion = document.getElementById('section-question');

// Custom Modal Elements
const customAlert = document.getElementById('custom-alert');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalOkBtn = document.getElementById('modal-ok-btn');

// --- YOUTUBE DUAL PLAYER INTEGRATION ---
let playerYes;
let playerNo;

// Load the YouTube Iframe Player API asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize both players when API is ready
window.onYouTubeIframeAPIReady = function() {
    // Player for Yes Option
    playerYes = new YT.Player('yt-player-yes', {
        height: '0',
        width: '0',
        videoId: '-FvlSkumjSA', // Yes video ID[cite: 1]
        playerVars: {
            'playsinline': 4,
            'autoplay': 0,
            'controls': 0
        }
    });

    // Player for No Option (Dodge Meme)
    playerNo = new YT.Player('yt-player-no', {
        height: '0',
        width: '0',
        videoId: '5qHezQZ5VlQ', // No video ID[cite: 2]
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 0
        }
    });
};

// 1. Transition: Intro -> Confession
btnToConfession.addEventListener('click', () => {
    sectionIntro.classList.remove('active');
    sectionConfession.classList.add('active');
});

// 2. Transition: Confession -> Question
btnToQuestion.addEventListener('click', () => {
    sectionConfession.classList.remove('active');
    sectionQuestion.classList.add('active');
});

// 3. Yes button: open custom modal, play "Yes" music, stop "No" music[cite: 3]
btnYes.addEventListener('click', () => {
    customAlert.classList.add('open');
    
    // Stop "No" meme sound if playing
    if (playerNo && typeof playerNo.stopVideo === 'function') {
        playerNo.stopVideo();
    }
    
    // Play sweet "Yes" music
    if (playerYes && typeof playerYes.playVideo === 'function') {
        playerYes.playVideo();
    }
});

// Close Modal Functions
function closeModal() {
    customAlert.classList.remove('open');
    // Pause the sweet background music when modal is dismissed
    if (playerYes && typeof playerYes.pauseVideo === 'function') {
        playerYes.pauseVideo();
    }
}

modalCloseBtn.addEventListener('click', closeModal);
modalOkBtn.addEventListener('click', closeModal);

// Close modal if user clicks outside of the modal box
customAlert.addEventListener('click', (e) => {
    if (e.target === customAlert) {
        closeModal();
    }
});

// 4. No button: Dodge AND play the "No" meme audio[cite: 3]
function dodgeButton() {
    // Save original dimensions
    const originalWidth = btnNo.offsetWidth;
    const originalHeight = btnNo.offsetHeight;
    
    btnNo.style.width = `${originalWidth}px`;
    btnNo.style.height = `${originalHeight}px`;

    const padding = 50;
    const maxX = window.innerWidth - originalWidth - padding;
    const maxY = window.innerHeight - originalHeight - padding;

    // Calculate random teleport location
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Teleport!
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    // Play "No No No" meme audio (Resets to 0s so it replays every click)[cite: 2, 3]
    if (playerNo && typeof playerNo.playVideo === 'function') {
        playerNo.seekTo(0);
        playerNo.playVideo();
    }
}

// Dodge and play audio on click[cite: 3]
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    dodgeButton();
});
