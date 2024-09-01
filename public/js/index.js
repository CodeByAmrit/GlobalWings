
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
