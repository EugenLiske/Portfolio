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

const formFeedbackOverlay = document.getElementById("form-feedback-overlay");
const formFeedbackMessage = document.getElementById("form-feedback-message");

let formFeedbackTimeout;
let formFeedbackFadeTimeout;


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
        messageDefault: "Ihre Nachricht",

        feedbackSuccess: "E-Mail erfolgreich versendet.",
        feedbackError: "Ups, da ist etwas schiefgelaufen."
    },

    en: {
        nameMissing: "Please enter your name.",
        emailMissing: "Please enter your email address.",
        messageMissing: "Please enter a message.",
        privacyPolicyMissing: "Please accept the privacy policy.",
        emailInvalid: "Please enter a valid email address.",

        nameDefault: "Your name",
        emailDefault: "Your email address",
        messageDefault: "Your message",

        feedbackSuccess: "Email sent successfully.",
        feedbackError: "Oops, something went wrong."
    }
};

/**
 * Sets the active form language and refreshes visible error messages.
 * @param {string} language - The selected language key.
 */
function setFormLanguage(language) {
    currentFormLanguage = language;
    updateVisibleFormErrors();
}

/**
 * Returns a translated form text by key.
 * @param {string} key - The translation key.
 * @returns {string} The translated text.
 */
function getFormTranslation(key) {
    return formTranslations[currentFormLanguage][key];
}


// ---- focus helper ---- //

/**
 * Focuses the first form input field.
 */
function focusForm() {
    nameInputField.focus();
}


// ---- checkbox ---- //

/**
 * Updates the visual checkbox state and removes checkbox errors when checked.
 */
function checkPrivacyPolicy() {
    checkboxWrapper.classList.toggle("checked", checkboxInputField.checked);

    if (checkboxInputField.checked) {
        hidePrivacyPolicyError();
    }
}

/**
 * Removes the privacy policy error state.
 */
function hidePrivacyPolicyError() {
    checkboxWrapper.classList.remove("error");
    privacyPolicyError.classList.add("deactivated");
}


// ---- validation overview ---- //

/**
 * Validates the current form input and updates the send button state.
 */
function validateFormInput() {
    const evaluatedFormInput = evaluateFormInput(readFormInput());
    setSendButtonState(evaluatedFormInput.allValid);
}

/**
 * Reads and trims all current form values.
 * @returns {Object} The current form input values.
 */
function readFormInput() {
    return {
        name: nameInputField.value.trim(),
        email: emailInputField.value.trim(),
        message: messageInputField.value.trim(),
        checkbox: checkboxInputField.checked
    };
}

/**
 * Evaluates all form fields and returns their validation state.
 * @param {Object} formInput - The current form input values.
 * @returns {Object} The evaluated validation result.
 */
function evaluateFormInput(formInput) {
    const nameFilled = formInput.name !== "";
    const emailFilled = formInput.email !== "";
    const messageFilled = formInput.message !== "";
    const emailFormatValid = isEmailValid(formInput.email);
    const allFieldsFilled = nameFilled && emailFilled && messageFilled;

    return {
        nameFilled,
        emailFilled,
        emailFormatValid,
        messageFilled,
        allFieldsFilled,
        checkboxIsChecked: formInput.checkbox,
        allValid: allFieldsFilled && formInput.checkbox && emailFormatValid
    };
}

/**
 * Checks whether an email address has a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email format is valid.
 */
function isEmailValid(email) {
    const regularExpression = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
    return regularExpression.test(email);
}


// ---- send button ---- //

/**
 * Activates or deactivates the send button.
 * @param {boolean} isFormValid - Whether the form is valid.
 */
function setSendButtonState(isFormValid) {
    sendFormButton.classList.toggle("activated", isFormValid);
    sendFormButton.classList.toggle("deactivated", !isFormValid);
}


// ---- single field validation ---- //

/**
 * Updates the name check icon and shows an error when the name is empty.
 */
function checkIfNameIsFilledAndValid() {
    const nameFilled = nameInputField.value.trim() !== "";

    nameCheckIcon.classList.toggle("activated", nameFilled);

    if (!nameFilled) {
        showNameError("nameMissing");
    }
}

/**
 * Updates the email check icon and shows an error for empty or invalid email input.
 */
function checkIfMailIsFilledAndValid() {
    const emailValue = emailInputField.value.trim();
    const emailFilled = emailValue !== "";
    const emailValid = isEmailValid(emailValue);

    emailCheckIcon.classList.toggle("activated", emailFilled && emailValid);

    if (!emailFilled) {
        showEmailError("emailMissing");
        return;
    }

    if (!emailValid) {
        showEmailError("emailInvalid");
    }
}

/**
 * Updates the message check icon and shows an error when the message is empty.
 */
function checkIfMessageIsFilledAndValid() {
    const messageFilled = messageInputField.value.trim() !== "";

    messageCheckIcon.classList.toggle("activated", messageFilled);

    if (!messageFilled) {
        showMessageError("messageMissing");
    }
}


// ---- clear errors ---- //

/**
 * Clears the name input error state and restores the default label.
 */
function clearNameError() {
    nameInputField.classList.remove("error-border");
    nameInputLabel.classList.remove("error-label");
    nameInputLabel.textContent = getFormTranslation("nameDefault");
}

/**
 * Clears the email input error state and restores the default label.
 */
function clearEmailError() {
    emailInputField.classList.remove("error-border");
    emailInputLabel.classList.remove("error-label");
    emailInputLabel.textContent = getFormTranslation("emailDefault");
}

/**
 * Clears the message input error state and restores the default label.
 */
function clearMessageError() {
    messageInputField.classList.remove("error-border");
    messageInputLabel.classList.remove("error-label");
    messageInputLabel.textContent = getFormTranslation("messageDefault");
}


// ---- error rendering ---- //

/**
 * Shows an error state for the name input.
 * @param {string} translationKey - The translation key for the error text.
 */
function showNameError(translationKey) {
    nameInputField.classList.add("error-border");
    nameInputLabel.classList.add("error-label");
    nameInputLabel.textContent = getFormTranslation(translationKey);
    nameCheckIcon.classList.remove("activated");
}

/**
 * Shows an error state for the email input.
 * @param {string} translationKey - The translation key for the error text.
 */
function showEmailError(translationKey) {
    emailInputField.classList.add("error-border");
    emailInputLabel.classList.add("error-label");
    emailInputLabel.textContent = getFormTranslation(translationKey);
    emailCheckIcon.classList.remove("activated");
}

/**
 * Shows an error state for the message input.
 * @param {string} translationKey - The translation key for the error text.
 */
function showMessageError(translationKey) {
    messageInputField.classList.add("error-border");
    messageInputLabel.classList.add("error-label");
    messageInputLabel.textContent = getFormTranslation(translationKey);
    messageCheckIcon.classList.remove("activated");
}

/**
 * Shows the privacy policy checkbox error.
 */
function showPrivacyPolicyError() {
    checkboxWrapper.classList.add("error");
    checkboxWrapper.classList.remove("checked");
    privacyPolicyError.textContent = getFormTranslation("privacyPolicyMissing");
    privacyPolicyError.classList.remove("deactivated");
}

/**
 * Shows all submit errors based on the validation result.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function renderSubmitErrors(evaluatedFormInput) {
    renderNameSubmitError(evaluatedFormInput);
    renderEmailSubmitError(evaluatedFormInput);
    renderMessageSubmitError(evaluatedFormInput);
    renderPrivacyPolicySubmitError(evaluatedFormInput);
}

/**
 * Shows the name submit error if needed.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function renderNameSubmitError(evaluatedFormInput) {
    if (!evaluatedFormInput.nameFilled) {
        showNameError("nameMissing");
    }
}

/**
 * Shows the email submit error if needed.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function renderEmailSubmitError(evaluatedFormInput) {
    if (!evaluatedFormInput.emailFilled) {
        showEmailError("emailMissing");
        return;
    }

    if (!evaluatedFormInput.emailFormatValid) {
        showEmailError("emailInvalid");
    }
}

/**
 * Shows the message submit error if needed.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function renderMessageSubmitError(evaluatedFormInput) {
    if (!evaluatedFormInput.messageFilled) {
        showMessageError("messageMissing");
    }
}

/**
 * Shows the privacy policy submit error if needed.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function renderPrivacyPolicySubmitError(evaluatedFormInput) {
    if (!evaluatedFormInput.checkboxIsChecked) {
        showPrivacyPolicyError();
    }
}


// ---- submit ---- //

/**
 * Validates the form and sends it when all inputs are valid.
 * @param {SubmitEvent} event - The form submit event.
 * @returns {Promise<boolean>} Always returns false to prevent default handling.
 */
async function checkFormAndSend(event) {
    event.preventDefault();

    const formInput = readFormInput();
    const evaluatedFormInput = evaluateFormInput(formInput);

    renderSubmitErrors(evaluatedFormInput);
    setSendButtonState(evaluatedFormInput.allValid);

    if (!evaluatedFormInput.allValid) {
        return false;
    }

    await sendValidForm(formInput);
}

/**
 * Sends a valid form input to the backend.
 * @param {Object} formInput - The validated form input values.
 */
async function sendValidForm(formInput) {
    try {
        const response = await postFormInput(formInput);
        const result = await response.json();

        validateMailResponse(response, result);
        resetFormAfterSend();
        showFormFeedback("feedbackSuccess");
    } catch (error) {
        console.error(error);
        showFormFeedback("feedbackError");
    }
}

/**
 * Shows a translated form feedback message.
 * @param {string} translationKey - The feedback translation key.
 */
function showFormFeedback(translationKey) {
    clearFormFeedbackTimeouts();

    formFeedbackMessage.textContent = getFormTranslation(translationKey);
    formFeedbackOverlay.classList.remove("deactivated", "fade-out");
    formFeedbackOverlay.classList.add("visible");

    formFeedbackTimeout = setTimeout(hideFormFeedback, 2000);
}

/**
 * Starts hiding the form feedback message.
 */
function hideFormFeedback() {
    formFeedbackOverlay.classList.add("fade-out");

    formFeedbackFadeTimeout = setTimeout(() => {
        formFeedbackOverlay.classList.remove("visible", "fade-out");
        formFeedbackOverlay.classList.add("deactivated");
    }, 500);
}

/**
 * Clears running form feedback timers.
 */
function clearFormFeedbackTimeouts() {
    clearTimeout(formFeedbackTimeout);
    clearTimeout(formFeedbackFadeTimeout);
}

/**
 * Sends form input values to the PHP mail endpoint.
 * @param {Object} formInput - The validated form input values.
 * @returns {Promise<Response>} The fetch response.
 */
function postFormInput(formInput) {
    return fetch("./send_mail.php", {
        method: "POST",
        headers: getMailRequestHeaders(),
        body: JSON.stringify(getMailRequestBody(formInput))
    });
}

/**
 * Returns the headers for the mail request.
 * @returns {Object} The request headers.
 */
function getMailRequestHeaders() {
    return {
        "Content-Type": "application/json"
    };
}

/**
 * Returns the mail request body.
 * @param {Object} formInput - The validated form input values.
 * @returns {Object} The request body.
 */
function getMailRequestBody(formInput) {
    return {
        name: formInput.name,
        email: formInput.email,
        message: formInput.message
    };
}

/**
 * Throws an error if the mail response is not successful.
 * @param {Response} response - The fetch response.
 * @param {Object} result - The parsed response body.
 */
function validateMailResponse(response, result) {
    if (!response.ok || !result.success) {
        throw new Error(result.error || "Mail delivery failed");
    }
}

/**
 * Resets all form fields and visual states after a successful send.
 */
function resetFormAfterSend() {
    clearFormFields();
    resetCheckboxState();
    resetCheckIcons();
    setSendButtonState(false);
}

/**
 * Clears all form input fields.
 */
function clearFormFields() {
    nameInputField.value = "";
    emailInputField.value = "";
    messageInputField.value = "";
}

/**
 * Resets the privacy policy checkbox.
 */
function resetCheckboxState() {
    checkboxInputField.checked = false;
    checkboxWrapper.classList.remove("checked");
}

/**
 * Removes all activated check icons.
 */
function resetCheckIcons() {
    checkIcons.forEach((checkIcon) => {
        checkIcon.classList.remove("activated");
    });
}


// ---- update visible translated errors ---- //

/**
 * Updates currently visible form errors after a language change.
 */
function updateVisibleFormErrors() {
    const evaluatedFormInput = evaluateFormInput(readFormInput());

    updateNameErrorText(evaluatedFormInput);
    updateEmailErrorText(evaluatedFormInput);
    updateMessageErrorText(evaluatedFormInput);
    updatePrivacyPolicyErrorText();
}

/**
 * Updates the visible name error text.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function updateNameErrorText(evaluatedFormInput) {
    if (nameInputLabel.classList.contains("error-label") && !evaluatedFormInput.nameFilled) {
        nameInputLabel.textContent = getFormTranslation("nameMissing");
    }
}

/**
 * Updates the visible email error text.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function updateEmailErrorText(evaluatedFormInput) {
    if (!emailInputLabel.classList.contains("error-label")) {
        return;
    }

    setVisibleEmailErrorText(evaluatedFormInput);
}

/**
 * Sets the correct visible email error text.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function setVisibleEmailErrorText(evaluatedFormInput) {
    if (!evaluatedFormInput.emailFilled) {
        emailInputLabel.textContent = getFormTranslation("emailMissing");
        return;
    }

    if (!evaluatedFormInput.emailFormatValid) {
        emailInputLabel.textContent = getFormTranslation("emailInvalid");
    }
}

/**
 * Updates the visible message error text.
 * @param {Object} evaluatedFormInput - The evaluated validation result.
 */
function updateMessageErrorText(evaluatedFormInput) {
    if (messageInputLabel.classList.contains("error-label") && !evaluatedFormInput.messageFilled) {
        messageInputLabel.textContent = getFormTranslation("messageMissing");
    }
}

/**
 * Updates the visible privacy policy error text.
 */
function updatePrivacyPolicyErrorText() {
    if (!privacyPolicyError.classList.contains("deactivated")) {
        privacyPolicyError.textContent = getFormTranslation("privacyPolicyMissing");
    }
}