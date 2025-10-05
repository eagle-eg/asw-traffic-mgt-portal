document.addEventListener('DOMContentLoaded', () => {
    const complaintsTableBody = document.getElementById('complaintsTableBody');
    const filterCitySelect = document.getElementById('filterCity');

    // Ensure language is set correctly on page load
    const savedLang = localStorage.getItem('currentLang') || 'en';
    setLanguage(savedLang); // Call setLanguage from language.js

    function renderComplaints(filterCity = 'all') {
        let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
        complaintsTableBody.innerHTML = ''; // Clear existing rows

        if (filterCity !== 'all') {
            complaints = complaints.filter(c => c.city === filterCity);
        }

        // Sort by timestamp descending (newest first)
        complaints.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (complaints.length === 0) {
            const noComplaintsRow = complaintsTableBody.insertRow();
            noComplaintsRow.innerHTML = `<td colspan="4" class="text-center" data-lang-key="noComplaintsFound">${translations[savedLang].noComplaintsFound}</td>`;
            return;
        }

        complaints.forEach(complaint => {
            const row = complaintsTableBody.insertRow();
            row.insertCell().textContent = complaint.id;
            row.insertCell().textContent = complaint.city;
            row.insertCell().textContent = complaint.text;
            row.insertCell().textContent = complaint.timestamp;
        });
    }

    if (filterCitySelect) {
        filterCitySelect.addEventListener('change', (e) => {
            renderComplaints(e.target.value);
        });
    }

    // Initial render
    renderComplaints();
});