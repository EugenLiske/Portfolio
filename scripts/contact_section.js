const nameInputField = document.getElementById('name-input');
const checkboxWrapper = document.getElementById('checkbox-wrapper-ID');
const checkboxInput = document.getElementById('checkbox-input');

function focusForm(){
    nameInputField.focus();
}

function checkPrivacyPolicy(){
    checkboxWrapper.classList.toggle('checked', checkboxInput.checked);
}