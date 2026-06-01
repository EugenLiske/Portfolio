// ---- DOM elements ---- //

const nameInputField = document.getElementById("name-input-field");
const emailInputField = document.getElementById("email-input-field");
const messageInputField = document.getElementById("message-input-field");

const checkboxWrapper = document.getElementById("checkbox-wrapper-ID");
const checkboxInputField = document.getElementById("checkbox-input-field");
const privacyPolicyError = document.getElementById("privacy-policy-error");

const sendFormButton = document.getElementById("send-form-button");

const nameCheckIcon = document.getElementById("name-check-icon");
const emailCheckIcon = document.getElementById("email-check-icon");
const messageCheckIcon = document.getElementById("message-check-icon");

const checkIcons = [nameCheckIcon, emailCheckIcon, messageCheckIcon];

const nameInputLabel = document.getElementById("name-input-label");
const emailInputLabel = document.getElementById("email-input-label");
const messageInputLabel = document.getElementById("message-input-label");


// ---- language state ---- //

let currentFormLanguage = "de";

const formTranslations = {
    de: {
        nameMissing: "Bitte geben Sie Ihren Namen ein.",
        emailMissing: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
        messageMissing: "Bitte geben Sie eine Nachricht ein.",
        privacyPolicyMissing: "Bitte stimmen Sie der Datenschutzerklärung zu.",
        emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",

        nameDefault: "Ihr Name",
        emailDefault: "Ihre E-Mail-Adresse",
        messageDefault: "Ihre Nachricht"
    },

    en: {
        nameMissing: "Please enter your name.",
        emailMissing: "Please enter your email address.",
        messageMissing: "Please enter a message.",
        privacyPolicyMissing: "Please accept the privacy policy.",
        emailInvalid: "Please enter a valid email address.",

        nameDefault: "Your name",
        emailDefault: "Your email address",
        messageDefault: "Your message"
    }
};

function setFormLanguage(language) {
    currentFormLanguage = language;
    updateVisibleFormErrors();
}

function getFormTranslation(key) {
    return formTranslations[currentFormLanguage][key];
}


// ---- focus helper ---- //

function focusForm() {
    nameInputField.focus();
}


// ---- checkbox ---- //

function checkPrivacyPolicy() {
    checkboxWrapper.classList.toggle("checked", checkboxInputField.checked);

    if (checkboxInputField.checked) {
        checkboxWrapper.classList.remove("error");
        privacyPolicyError.classList.add("deactivated");
    }
}


// ---- validation overview ---- //

function validateFormInput() {
    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);

    setSendButtonState(evaluatedFormInput.allValid);
}

function readFormInput() {
    return {
        name: nameInputField.value.trim(),
        email: emailInputField.value.trim(),
        message: messageInputField.value.trim(),
        checkbox: checkboxInputField.checked
    };
}

function evaluateFormInput(formInput) {
    const nameFilled = formInput.name !== "";
    const emailFilled = formInput.email !== "";
    const emailFormatValid = isEmailValid(formInput.email);
    const messageFilled = formInput.message !== "";
    const allFieldsFilled = nameFilled && emailFilled && messageFilled;
    const checkboxIsChecked = formInput.checkbox;

    return {
        nameFilled: nameFilled,
        emailFilled: emailFilled,
        emailFormatValid: emailFormatValid,
        messageFilled: messageFilled,
        allFieldsFilled: allFieldsFilled,
        checkboxIsChecked: checkboxIsChecked,
        allValid: allFieldsFilled && checkboxIsChecked && emailFormatValid
    };
}

function isEmailValid(email) {
    const regularExpression = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    return regularExpression.test(email);
}


// ---- send button ---- //

function setSendButtonState(isFormValid) {
    if (isFormValid) {
        sendFormButton.classList.remove("deactivated");
        sendFormButton.classList.add("activated");
    } else {
        sendFormButton.classList.remove("activated");
        sendFormButton.classList.add("deactivated");
    }
}


// ---- single field validation ---- //

function checkIfNameIsFilled() {
    if (nameInputField.value.trim() !== "") {
        nameCheckIcon.classList.add("activated");
    } else {
        nameCheckIcon.classList.remove("activated");
    }
}

function checkIfMailIsFilledAndValid() {
    const emailValue = emailInputField.value.trim();

    const emailFilled = emailValue !== "";
    const emailValid = isEmailValid(emailValue);

    if (emailFilled && emailValid) {
        emailCheckIcon.classList.add("activated");
    } else if (emailFilled && !emailValid) {
        emailCheckIcon.classList.remove("activated");

        emailInputField.classList.add("error-border");
        emailInputLabel.classList.add("error-label");
        emailInputLabel.textContent = getFormTranslation("emailInvalid");
    } else {
        emailCheckIcon.classList.remove("activated");
    }
}

function checkIfMessageIsFilled() {
    if (messageInputField.value.trim() !== "") {
        messageCheckIcon.classList.add("activated");
    } else {
        messageCheckIcon.classList.remove("activated");
    }
}


// ---- clear errors ---- //

function clearNameError() {
    nameInputField.classList.remove("error-border");
    nameInputLabel.classList.remove("error-label");
    nameInputLabel.textContent = getFormTranslation("nameDefault");
}

function clearEmailError() {
    emailInputField.classList.remove("error-border");
    emailInputLabel.classList.remove("error-label");
    emailInputLabel.textContent = getFormTranslation("emailDefault");
}

function clearMessageError() {
    messageInputField.classList.remove("error-border");
    messageInputLabel.classList.remove("error-label");
    messageInputLabel.textContent = getFormTranslation("messageDefault");
}


// ---- submit ---- //

async function checkFormAndSend(event) {
    event.preventDefault();

    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);

    renderSubmitErrors(evaluatedFormInput);
    setSendButtonState(evaluatedFormInput.allValid);

    if (!evaluatedFormInput.allValid) {
        return false;
    }

    try {
        const response = await fetch("./send_mail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formInput.name,
                email: formInput.email,
                message: formInput.message
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || "Mail delivery failed");
        }

        nameInputField.value = "";
        emailInputField.value = "";
        messageInputField.value = "";
        checkboxInputField.checked = false;

        checkboxWrapper.classList.remove("checked");
        checkIcons.forEach((checkIcon) => {
            checkIcon.classList.remove("activated");
        });

        setSendButtonState(false);


        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function renderSubmitErrors(evaluatedFormInput) {
    if (!evaluatedFormInput.nameFilled) {
        nameInputField.classList.add("error-border");
        nameInputLabel.classList.add("error-label");
        nameInputLabel.textContent = getFormTranslation("nameMissing");

        nameCheckIcon.classList.remove("activated");
    }

    if (!evaluatedFormInput.emailFilled) {
        emailInputField.classList.add("error-border");
        emailInputLabel.classList.add("error-label");
        emailInputLabel.textContent = getFormTranslation("emailMissing");

        emailCheckIcon.classList.remove("activated");
    } else if (!evaluatedFormInput.emailFormatValid) {
        emailInputField.classList.add("error-border");
        emailInputLabel.classList.add("error-label");
        emailInputLabel.textContent = getFormTranslation("emailInvalid");

        emailCheckIcon.classList.remove("activated");
    }

    if (!evaluatedFormInput.messageFilled) {
        messageInputField.classList.add("error-border");
        messageInputLabel.classList.add("error-label");
        messageInputLabel.textContent = getFormTranslation("messageMissing");

        messageCheckIcon.classList.remove("activated");
    }

    if (!evaluatedFormInput.checkboxIsChecked) {
        checkboxWrapper.classList.add("error");
        checkboxWrapper.classList.remove("checked");

        privacyPolicyError.textContent = getFormTranslation("privacyPolicyMissing");
        privacyPolicyError.classList.remove("deactivated");
    }
}

function updateVisibleFormErrors() {
    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);

    if (nameInputLabel.classList.contains("error-label")) {
        if (!evaluatedFormInput.nameFilled) {
            nameInputLabel.textContent = getFormTranslation("nameMissing");
        }
    }

    if (emailInputLabel.classList.contains("error-label")) {
        if (!evaluatedFormInput.emailFilled) {
            emailInputLabel.textContent = getFormTranslation("emailMissing");
        } else if (!evaluatedFormInput.emailFormatValid) {
            emailInputLabel.textContent = getFormTranslation("emailInvalid");
        }
    }

    if (messageInputLabel.classList.contains("error-label")) {
        if (!evaluatedFormInput.messageFilled) {
            messageInputLabel.textContent = getFormTranslation("messageMissing");
        }
    }

    if (!privacyPolicyError.classList.contains("deactivated")) {
        privacyPolicyError.textContent = getFormTranslation("privacyPolicyMissing");
    }
}