const nameInputField = document.getElementById('name-input-field');
const emailInputField = document.getElementById('email-input-field');
const messageInputField = document.getElementById('message-input-field')
const checkboxWrapper = document.getElementById('checkbox-wrapper-ID');
const checkboxInputField = document.getElementById('checkbox-input-field');
const sendFormButton = document.getElementById('send-form-button');

const NAME_ERROR_MSG = "Your name is required";
const EMAIL_ERROR_MSG = "Your Email is required";
const MESSAGE_ERROR_MSG = "Your Message is requred";
const PRIVACY_POLICY_ERROR_MSG = "Please accept the privacy policy."



function focusForm(){
    nameInputField.focus();
}

function checkPrivacyPolicy(){
    checkboxWrapper.classList.toggle('checked', checkboxInputField.checked);
}

function validateForm(){
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
    const allFieldsFilled = formInput.name !== "" && formInput.email !== "" && formInput.message !== "";
    const checkboxIsChecked = formInput.checkbox;
    const emailFormatValid = isEmailValid(formInput.email);

    return {
        allFieldsFilled: allFieldsFilled,
        checkboxIsChecked: checkboxIsChecked,
        emailFormatValid: emailFormatValid,
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
        sendFormButton.classList.add('activated')
    } else {
        sendFormButton.classList.remove('activated');
        sendFormButton.classList.add('deactivated')
    }
}