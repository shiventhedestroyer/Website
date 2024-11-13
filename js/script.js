// JavaScript code to handle dropdown filtering and navigation
const validRoles = ['reviewer', 'partner', 'family', 'admin'];

// Show all options when input is focused
function showOptions() {
    const dropdown = document.getElementById('dropdownOptions');
    const options = dropdown.getElementsByTagName('div');

    // Show all options
    dropdown.classList.add('show');
    for (let option of options) {
        option.style.display = 'block';
    }

    // Hide error message if it's displayed
    document.getElementById('errorMessage').style.display = 'none';
}

// Filter options based on user input
function filterOptions() {
    const input = document.getElementById('roleInput').value.toLowerCase();
    const dropdown = document.getElementById('dropdownOptions');
    const options = dropdown.getElementsByTagName('div');

    // Show all options if input is empty
    if (input.trim() === '') {
        dropdown.classList.add('show');
        for (let option of options) {
            option.style.display = 'block'; // Ensure all options are visible
        }
        return;
    }

    // Filter each option based on input
    let hasMatches = false;
    for (let option of options) {
        if (option.textContent.toLowerCase().includes(input)) {
            option.style.display = 'block';
            hasMatches = true;
        } else {
            option.style.display = 'none';
        }
    }

    // Hide dropdown if no matches
    if (!hasMatches) {
        dropdown.classList.remove('show');
    }
}

// Function to auto-fill the text field when selecting an option
function selectRole(role) {
    document.getElementById('roleInput').value = role;
    document.getElementById('dropdownOptions').classList.remove('show');
}

// Function to navigate to the specified page or show an error
function navigateToPage() {
    const role = document.getElementById('roleInput').value.toLowerCase();
    if (validRoles.includes(role)) {
        window.location.href = role + '.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

// Hide the dropdown options when clicking outside the input
document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown-container')) {
        document.getElementById('dropdownOptions').classList.remove('show');
    }
});
