
// Simple client-side search
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('#aircraftCards .col-md-4');

    cards.forEach(card => {
        const aircraftName = card.querySelector('.card-title').textContent.toLowerCase();
        if (aircraftName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// AUDIO PLAY
window.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('/sound/ENTRY.mp3');
    const playAudio = () => {
        audio.play().catch(error => {
            console.error('Playback failed:', error);
        });
        document.removeEventListener('click', playAudio); // Remove listener after playback starts
    };

    document.addEventListener('click', playAudio);
});