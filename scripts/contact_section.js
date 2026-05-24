// ---- DOM elements ---- //

const nameInputField = document.getElementById('name-input-field');
const emailInputField = document.getElementById('email-input-field');
const messageInputField = document.getElementById('message-input-field')
const checkboxWrapper = document.getElementById('checkbox-wrapper-ID');
const checkboxInputField = document.getElementById('checkbox-input-field');
const privacyPolicyError = document.getElementById('privacy-policy-error');
const sendFormButton = document.getElementById('send-form-button');

const nameCheckIcon = document.getElementById('name-check-icon');
const emailCheckIcon = document.getElementById('email-check-icon');
const messageCheckIcon = document.getElementById('message-check-icon');

const nameInputLabel = document.getElementById('name-input-label');
const emailInputLabel = document.getElementById('email-input-label');
const messageInputLabel = document.getElementById('message-input-label');

const NAME_MISSING_MSG = "Bitte geben Sie Ihren Namen ein.";
const EMAIL_MISSING_MSG = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
const MESSAGE_MISSING_MSG = "Bitte geben Sie eine Nachricht ein.";
const PRIVACY_POLICY_MISSING_MSG = "Bitte akzeptieren Sie die Datenschutzerklärung.";
const EMAIL_INVALID_MSG = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";

const NAME_DEFAULT_LABEL = "Ihr Name";
const EMAIL_DEFAULT_LABEL = "Ihre E-Mail-Adresse";
const MESSAGE_DEFAULT_LABEL = "Ihre Nachricht";



function focusForm(){
    nameInputField.focus();
}

function checkPrivacyPolicy() {
    checkboxWrapper.classList.toggle('checked', checkboxInputField.checked);

    if (checkboxInputField.checked) {
        checkboxWrapper.classList.remove('error');
        privacyPolicyError.classList.add('deactivated');
    }
}

function validateFormInput(){
    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);
    setSendButtonState(evaluatedFormInput.allValid);
}

function readFormInput(){
    return {
        name: nameInputField.value.trim(),
        email: emailInputField.value.trim(),
        message: messageInputField.value.trim(),
        checkbox: checkboxInputField.checked
    };
}

function evaluateFormInput(formInput){
    const nameFilled = formInput.name !== "";
    const emailFilled = formInput.email !== "";
    const emailFormatValid = isEmailValid(formInput.email);
    const messageFilled = formInput.message !== "";
    const allFieldsFilled = formInput.name !== "" && formInput.email !== "" && formInput.message !== "";
    const checkboxIsChecked = formInput.checkbox;
    
    return {
        nameFilled: nameFilled,
        emailFilled: emailFilled,
        emailFormatValid: emailFormatValid,
        messageFilled: messageFilled,
        allFieldsFilled: allFieldsFilled,
        checkboxIsChecked: checkboxIsChecked,
        allValid: allFieldsFilled && checkboxIsChecked && emailFormatValid
    }
}

function isEmailValid(email) {
  let regularExpression = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return regularExpression.test(email);
}

function setSendButtonState(isFormValid){
    if(isFormValid){
        sendFormButton.classList.remove('deactivated');
        sendFormButton.classList.add('activated');
    } else {
        sendFormButton.classList.remove('activated');
        sendFormButton.classList.add('deactivated');
    }
}

function checkIfNameIsFilled(){
    if(nameInputField.value !== ""){
        nameCheckIcon.classList.remove('deactivated');
        nameCheckIcon.classList.add('activated');
    } else {
        nameCheckIcon.classList.add('deactivated');
        nameCheckIcon.classList.remove('activated');
    }
}

function checkIfMailIsFilledAndValid(){
    const emailValue = emailInputField.value.trim();

    const emailFilled = emailValue !== "";
    const emailValid = isEmailValid(emailValue);

    if(emailFilled && emailValid){
        emailCheckIcon.classList.remove('deactivated');
        emailCheckIcon.classList.add('activated');
    } else if (emailFilled && !emailValid) {
        emailCheckIcon.classList.add('deactivated');
        emailCheckIcon.classList.remove('activated');
        emailInputField.classList.add('error-border');
        emailInputLabel.classList.add('error-label');
        emailInputLabel.textContent = EMAIL_INVALID_MSG;
    } else {
        emailCheckIcon.classList.add('deactivated');
        emailCheckIcon.classList.remove('activated');
    }
}

function checkIfMessageIsFilled(){
    if(messageInputField.value !== ""){
        messageCheckIcon.classList.remove('deactivated');
        messageCheckIcon.classList.add('activated');
    } else {
        messageCheckIcon.classList.add('deactivated');
        messageCheckIcon.classList.remove('activated');
    }
}

function clearNameError(){
    nameInputField.classList.remove('error-border');
    nameInputLabel.classList.remove('error-label');
    nameInputLabel.textContent = NAME_DEFAULT_LABEL;
}

function clearEmailError(){
    emailInputField.classList.remove('error-border');
    emailInputLabel.classList.remove('error-label');
    emailInputLabel.textContent = EMAIL_DEFAULT_LABEL;
}

function clearMessageError(){
    messageInputField.classList.remove('error-border');
    messageInputLabel.classList.remove('error-label');
    messageInputLabel.textContent = MESSAGE_DEFAULT_LABEL;
}

function checkFormAndSend(event) {
    event.preventDefault();
    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);

    renderSubmitErrors(evaluatedFormInput);
    setSendButtonState(evaluatedFormInput.allValid);

    if (!evaluatedFormInput.allValid) {
        return false;
    }

    // hier später echte Sendelogik
    return false;
}

function renderSubmitErrors(evaluatedFormInput) {
    if (!evaluatedFormInput.nameFilled) {
        nameInputField.classList.add('error-border');
        nameInputLabel.classList.add('error-label');
        nameInputLabel.textContent = NAME_MISSING_MSG;
        nameCheckIcon.classList.add('deactivated');
        nameCheckIcon.classList.remove('activated');
    }

    if (!evaluatedFormInput.emailFilled) {
        emailInputField.classList.add('error-border');
        emailInputLabel.classList.add('error-label');
        emailInputLabel.textContent = EMAIL_MISSING_MSG;
        emailCheckIcon.classList.add('deactivated');
        emailCheckIcon.classList.remove('activated');
    } else if (!evaluatedFormInput.emailFormatValid) {
        emailInputField.classList.add('error-border');
        emailInputLabel.classList.add('error-label');
        emailInputLabel.textContent = EMAIL_INVALID_MSG;
        emailCheckIcon.classList.add('deactivated');
        emailCheckIcon.classList.remove('activated');
    }

    if (!evaluatedFormInput.messageFilled) {
        messageInputField.classList.add('error-border');
        messageInputLabel.classList.add('error-label');
        messageInputLabel.textContent = MESSAGE_MISSING_MSG;
        messageCheckIcon.classList.add('deactivated');
        messageCheckIcon.classList.remove('activated');
    }

    if (!evaluatedFormInput.checkboxIsChecked) {
        checkboxWrapper.classList.add('error');
        checkboxWrapper.classList.remove('checked');
        privacyPolicyError.classList.remove('deactivated');
    }
}

