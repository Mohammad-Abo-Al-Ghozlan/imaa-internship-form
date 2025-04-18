document.addEventListener('DOMContentLoaded', function() {
    const internshipForm = document.getElementById('internshipForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const confirmationModal = document.getElementById('confirmationModal');
    const continueToWhatsAppBtn = document.getElementById('continueToWhatsApp');
    let whatsappUrl = '';

    // Form validation
    function validateField(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (field.type === 'radio') {
            const radioGroup = document.getElementsByName(field.name);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            
            if (!isChecked) {
                errorElement.style.display = 'block';
                return false;
            } else {
                errorElement.style.display = 'none';
                return true;
            }
        } 
        else if (field.type === 'file') {
            if (!field.files || !field.files[0]) {
                errorElement.style.display = 'block';
                return false;
            } else {
                const fileName = field.files[0].name;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                
                if (!['pdf', 'doc', 'docx'].includes(fileExtension)) {
                    errorElement.textContent = 'Please upload a PDF or DOC file';
                    errorElement.style.display = 'block';
                    return false;
                } else {
                    errorElement.style.display = 'none';
                    return true;
                }
            }
        } 
        else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim() || !emailRegex.test(field.value.trim())) {
                field.classList.add('input-error');
                errorElement.style.display = 'block';
                return false;
            } else {
                field.classList.remove('input-error');
                errorElement.style.display = 'none';
                return true;
            }
        } 
        else if (field.type === 'select-one') {
            if (!field.value) {
                field.classList.add('input-error');
                errorElement.style.display = 'block';
                return false;
            } else {
                field.classList.remove('input-error');
                errorElement.style.display = 'none';
                return true;
            }
        }
        else {
            if (!field.value.trim()) {
                field.classList.add('input-error');
                errorElement.style.display = 'block';
                return false;
            } else {
                field.classList.remove('input-error');
                errorElement.style.display = 'none';
                return true;
            }
        }
    }

    // Add validation listeners to each field
    document.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
    });

    // Form submission
    internshipForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const fullNameValid = validateField(document.getElementById('fullName'));
        const emailValid = validateField(document.getElementById('email'));
        const universityValid = validateField(document.getElementById('university'));
        const majorValid = validateField(document.getElementById('major'));
        const genderRadios = document.querySelector('input[name="gender"]');
        const genderValid = validateField(genderRadios);
        const graduationStatusValid = validateField(document.getElementById('graduationStatus'));
        
        if (!(fullNameValid && emailValid && universityValid && majorValid && genderValid && graduationStatusValid)) {
            return;
        }
        
        // Show loading indicator
        loadingIndicator.style.display = 'flex';
        
        // Get form values
        const formData = new FormData(internshipForm);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const university = formData.get('university');
        const major = formData.get('major');
        const gender = formData.get('gender');
        const graduationStatus = formData.get('graduationStatus');
        
        // Prepare WhatsApp message
        const messageBody = `*IMAA Internship Application*
- Full Name: ${fullName}
- Email: ${email}
- University: ${university}
- Major: ${major}
- Gender: ${gender}
- Graduation Status: ${graduationStatus}

I have completed the internship application form on your website.`;

        // Create WhatsApp URL
        const phoneNumber = '96181985614'; // Remove + and spaces for WhatsApp URL
        whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageBody)}`;
        
        // Hide loading and show confirmation
        loadingIndicator.style.display = 'none';
        confirmationModal.classList.add('show');
    });
    
    // WhatsApp redirect
    continueToWhatsAppBtn.addEventListener('click', function() {
        window.open(whatsappUrl, '_blank');
        confirmationModal.classList.remove('show');
        internshipForm.reset();
        fileName.textContent = 'No file chosen';
    });
});
