document.addEventListener('DOMContentLoaded', function() {
    const internshipForm = document.getElementById('internshipForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const confirmationModal = document.getElementById('confirmationModal');

    // Form submission
    internshipForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const formData = new FormData(internshipForm);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const university = formData.get('university');
        const major = formData.get('major');
        const gender = formData.get('gender');
        const graduationStatus = formData.get('graduationStatus');
        
        // Show loading indicator
        loadingIndicator.style.display = 'flex';
        
        // Prepare WhatsApp message
        const messageBody = `*IMAA Internship Application*%0A
- Full Name: ${fullName}%0A
- Email: ${email}%0A
- University: ${university}%0A
- Major: ${major}%0A
- Gender: ${gender}%0A
- Graduation Status: ${graduationStatus}`;

        // Create WhatsApp URL
        const phoneNumber = '96181985614';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageBody}`;
        
        // Hide loading after a short delay
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            confirmationModal.classList.add('show');
            
            // Set up WhatsApp redirect
            document.getElementById('continueToWhatsApp').onclick = function() {
                window.open(whatsappUrl, '_blank');
                confirmationModal.classList.remove('show');
                internshipForm.reset();
            };
        }, 1000);
    });
});
