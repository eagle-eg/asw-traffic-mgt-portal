document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaintForm');
    const complaintText = document.getElementById('complaintText');
    const citySelect = document.getElementById('citySelect');
    const successMessage = document.getElementById('successMessage');

    // Ensure language is set correctly on page load
    const savedLang = localStorage.getItem('currentLang') || 'en';
    setLanguage(savedLang); // Call setLanguage from language.js

    if (complaintForm) {
        complaintForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const complaint = {
                id: Date.now(),
                text: complaintText.value,
                city: citySelect.value,
                timestamp: new Date().toLocaleString()
            };

            let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
            complaints.push(complaint);
            localStorage.setItem('complaints', JSON.stringify(complaints));

            complaintText.value = '';
            citySelect.value = ''; // Reset dropdown
            successMessage.classList.remove('d-none'); // Show success message
            setTimeout(() => {
                successMessage.classList.add('d-none'); // Hide after a few seconds
            }, 5000);
        });
    }
});