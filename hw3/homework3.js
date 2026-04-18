// ── Helper Functions ────────────────────────────────────
function showError(id, msg) {
    document.getElementById(id).innerHTML = "<span class='errorText'>" + msg + "</span>";
}
function clearError(id) {
    document.getElementById(id).innerHTML = "<span class='successMsg'>&#10003;</span>";
}

// Check All Valid: shows/hides submit button 
// Uses a dedicated error flag attribute instead of reading text content
function checkAllValid() {
    let hasError = false;

    // Check for any fields flagged with data-error="true"
    document.querySelectorAll("[data-error='true']").forEach(() => {
        hasError = true;
    });

    // Check required fields still empty and untouched
    const requiredFields = ["firstName", "lastName", "dob", "phone", "ssn",
                            "address1", "city", "zip", "email", "userid", "password", "confirmPassword"];
    requiredFields.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.value.trim() === "") hasError = true;
    });

    // Check state dropdown
    if (document.getElementById("state").value === "") hasError = true;

    // Check required radio button groups
    if (!document.querySelector('input[name="gender"]:checked')) hasError = true;
    if (!document.querySelector('input[name="vaccinated"]:checked')) hasError = true;
    if (!document.querySelector('input[name="insurance"]:checked')) hasError = true;

    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.style.display = hasError ? "none" : "inline-block";
    }
}

//Flag Helpers (reliable error state tracking)
function flagError(inputId, msgId, msg) {
    const el = document.getElementById(inputId);
    if (el) el.setAttribute("data-error", "true");
    showError(msgId, msg);
}
function flagClear(inputId, msgId) {
    const el = document.getElementById(inputId);
    if (el) el.removeAttribute("data-error");
    clearError(msgId);
}
function flagClearOptional(inputId, msgId) {
    const el = document.getElementById(inputId);
    if (el) el.removeAttribute("data-error");
    document.getElementById(msgId).innerHTML = "";
}

// ── Individual Validate Modules ─────────────────────────

function validateFirstName() {
    const value = document.getElementById("firstName").value.trim();
    if (value === "") {
        flagError("firstName", "firstNameMsg", "First name is required");
    } else if (!/^[A-Za-z'-]{1,30}$/.test(value)) {
        flagError("firstName", "firstNameMsg", "Letters only, apostrophes and dashes allowed");
    } else {
        flagClear("firstName", "firstNameMsg");
    }
    checkAllValid();
}

function validateMiddleInitial() {
    const value = document.getElementById("middleInitial").value.trim();
    if (value !== "" && !/^[A-Za-z]$/.test(value)) {
        flagError("middleInitial", "middleInitialMsg", "Must be one letter only");
    } else {
        flagClearOptional("middleInitial", "middleInitialMsg");
    }
    checkAllValid();
}

function validateLastName() {
    const value = document.getElementById("lastName").value.trim();
    if (value === "") {
        flagError("lastName", "lastNameMsg", "Last name is required");
    } else if (!/^[A-Za-z'-]{1,30}$/.test(value)) {
        flagError("lastName", "lastNameMsg", "Letters only, apostrophes and dashes allowed");
    } else {
        flagClear("lastName", "lastNameMsg");
    }
    checkAllValid();
}

function validateDOB() {
    const value = document.getElementById("dob").value;
    const today = new Date();
    const dob = new Date(value + "T00:00:00");
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (value === "") {
        flagError("dob", "dobMsg", "Date of birth is required");
    } else if (dob > today) {
        flagError("dob", "dobMsg", "Date of birth cannot be in the future");
    } else if (dob < minDate) {
        flagError("dob", "dobMsg", "Cannot be more than 120 years ago");
    } else {
        flagClear("dob", "dobMsg");
    }
    checkAllValid();
}

function validatePhone() {
    const value = document.getElementById("phone").value.trim();
    if (value === "") {
        flagError("phone", "phoneMsg", "Phone number is required");
    } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)) {
        flagError("phone", "phoneMsg", "Format must be 000-000-0000");
    } else {
        flagClear("phone", "phoneMsg");
    }
    checkAllValid();
}

// SSN auto-format: inserts dashes as user types → 000-00-0000
function formatSSN() {
    const el = document.getElementById("ssn");
    let digits = el.value.replace(/\D/g, "").slice(0, 9);
    if (digits.length > 5) {
        digits = digits.slice(0, 3) + "-" + digits.slice(3, 5) + "-" + digits.slice(5);
    } else if (digits.length > 3) {
        digits = digits.slice(0, 3) + "-" + digits.slice(3);
    }
    el.value = digits;
    validateSSN();
}

function validateSSN() {
    const value = document.getElementById("ssn").value.trim();
    if (value === "") {
        flagError("ssn", "ssnMsg", "SSN is required");
    } else if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(value)) {
        flagError("ssn", "ssnMsg", "SSN must be in format 000-00-0000 (9 digits)");
    } else {
        flagClear("ssn", "ssnMsg");
    }
    checkAllValid();
}

function validateEmail() {
    const el = document.getElementById("email");
    el.value = el.value.toLowerCase();
    const value = el.value.trim();
    if (value === "") {
        flagError("email", "emailMsg", "Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        flagError("email", "emailMsg", "Enter a valid email: name@domain.tld");
    } else {
        flagClear("email", "emailMsg");
    }
    checkAllValid();
}

function validateAddress1() {
    const value = document.getElementById("address1").value.trim();
    if (value === "") {
        flagError("address1", "address1Msg", "Address line 1 is required");
    } else if (value.length < 2 || value.length > 30) {
        flagError("address1", "address1Msg", "Must be 2-30 characters");
    } else {
        flagClear("address1", "address1Msg");
    }
    checkAllValid();
}

function validateAddress2() {
    const value = document.getElementById("address2").value.trim();
    if (value !== "" && (value.length < 2 || value.length > 30)) {
        flagError("address2", "address2Msg", "Must be 2-30 characters if entered");
    } else {
        flagClearOptional("address2", "address2Msg");
    }
    checkAllValid();
}

function validateCity() {
    const value = document.getElementById("city").value.trim();
    if (value === "") {
        flagError("city", "cityMsg", "City is required");
    } else if (value.length < 2 || value.length > 30) {
        flagError("city", "cityMsg", "Must be 2-30 characters");
    } else {
        flagClear("city", "cityMsg");
    }
    checkAllValid();
}

function validateState() {
    const value = document.getElementById("state").value;
    if (value === "") {
        flagError("state", "stateMsg", "State is required");
    } else {
        flagClear("state", "stateMsg");
    }
    checkAllValid();
}

function validateZip() {
    const value = document.getElementById("zip").value.trim();
    if (value === "") {
        flagError("zip", "zipMsg", "ZIP code is required");
    } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
        flagError("zip", "zipMsg", "ZIP must be 5 digits or 00000-0000 format");
    } else {
        flagClear("zip", "zipMsg");
    }
    checkAllValid();
}

function validateSymptoms() {
    const value = document.getElementById("symptoms").value.trim();
    if (value !== "" && value.length < 5) {
        flagError("symptoms", "symptomsMsg", "Please provide at least a brief description (5+ characters)");
    } else {
        flagClearOptional("symptoms", "symptomsMsg");
    }
    // Optional field — does not block submit
}

function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
        showError("genderMsg", "Please select a gender");
    } else {
        clearError("genderMsg");
    }
    checkAllValid();
}

function validateVaccinated() {
    const selected = document.querySelector('input[name="vaccinated"]:checked');
    if (!selected) {
        showError("vaccinatedMsg", "Please select an option");
    } else {
        clearError("vaccinatedMsg");
    }
    checkAllValid();
}

function validateInsurance() {
    const selected = document.querySelector('input[name="insurance"]:checked');
    if (!selected) {
        showError("insuranceMsg", "Please select an option");
    } else {
        clearError("insuranceMsg");
    }
    checkAllValid();
}

function validateUserID() {
    const value = document.getElementById("userid").value.trim();
    if (value === "") {
        flagError("userid", "useridMsg", "User ID is required");
    } else if (!/^[A-Za-z][A-Za-z0-9_-]{4,29}$/.test(value)) {
        flagError("userid", "useridMsg", "5-30 characters. Must start with a letter. No spaces or special characters.");
    } else {
        flagClear("userid", "useridMsg");
    }
    checkAllValid();
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const userid    = document.getElementById("userid").value.toLowerCase();
    const firstName = document.getElementById("firstName").value.toLowerCase();
    const lastName  = document.getElementById("lastName").value.toLowerCase();

    if (password === "") {
        flagError("password", "passwordMsg", "Password is required");
    } else if (password.length < 8 || password.length > 30) {
        flagError("password", "passwordMsg", "Password must be 8-30 characters");
    } else if (!/[A-Z]/.test(password)) {
        flagError("password", "passwordMsg", "Must contain at least 1 uppercase letter");
    } else if (!/[a-z]/.test(password)) {
        flagError("password", "passwordMsg", "Must contain at least 1 lowercase letter");
    } else if (!/[0-9]/.test(password)) {
        flagError("password", "passwordMsg", "Must contain at least 1 number");
    } else if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(password)) {
        flagError("password", "passwordMsg", "Must contain at least 1 special character");
    } else if (/["']/.test(password)) {
        flagError("password", "passwordMsg", "Password cannot contain quotes");
    } else if (userid !== "" && password.toLowerCase() === userid) {
        flagError("password", "passwordMsg", "Password cannot be the same as your User ID");
    } else if (userid !== "" && password.toLowerCase().includes(userid)) {
        flagError("password", "passwordMsg", "Password cannot contain your User ID");
    } else if (firstName !== "" && password.toLowerCase().includes(firstName)) {
        flagError("password", "passwordMsg", "Password cannot contain your first name");
    } else if (lastName !== "" && password.toLowerCase().includes(lastName)) {
        flagError("password", "passwordMsg", "Password cannot contain your last name");
    } else {
        flagClear("password", "passwordMsg");
    }
    if (document.getElementById("confirmPassword").value !== "") {
        validateConfirmPassword();
    }
    checkAllValid();
}

function validateConfirmPassword() {
    const password        = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword === "") {
        flagError("confirmPassword", "confirmPasswordMsg", "Please re-enter your password");
    } else if (confirmPassword !== password) {
        flagError("confirmPassword", "confirmPasswordMsg", "Passwords do not match");
    } else {
        document.getElementById("confirmPassword").removeAttribute("data-error");
        document.getElementById("confirmPasswordMsg").innerHTML = "<span class='successMsg'>&#10003; Passwords match</span>";
    }
    checkAllValid();
}

// ── Submit: runs all validations, returns false if errors ──
function validateForm() {
    validateFirstName();
    validateMiddleInitial();
    validateLastName();
    validateDOB();
    validatePhone();
    validateSSN();
    validateEmail();
    validateAddress1();
    validateAddress2();
    validateCity();
    validateState();
    validateZip();
    validateSymptoms();
    validateGender();
    validateVaccinated();
    validateInsurance();
    validateUserID();
    validatePassword();
    validateConfirmPassword();
    convertUserID();
    checkAllValid();

    // Block if any data-error flags remain
    const errorFields = document.querySelectorAll("[data-error='true']");
    if (errorFields.length > 0) return false;

    // Also block if radios are missing
    if (!document.querySelector('input[name="gender"]:checked')) return false;
    if (!document.querySelector('input[name="vaccinated"]:checked')) return false;
    if (!document.querySelector('input[name="insurance"]:checked')) return false;

    return true;
}

// ── Utility Functions ────────────────────────────────────
function updateHealth(value) {
    document.getElementById("healthValue").innerHTML = value;
}

function convertUserID() {
    const userid = document.getElementById("userid");
    userid.value = userid.value.toLowerCase();
}

function resetForm() {
    // Hide submit button and wipe all messages and error flags
    document.getElementById("submitBtn").style.display = "none";
    document.querySelectorAll(".errorMsg").forEach(span => span.innerHTML = "");
    document.querySelectorAll("[data-error='true']").forEach(el => el.removeAttribute("data-error"));
}

// ── Review Form ──────────────────────────────────────────
function reviewForm() {
    const tableBody = document.querySelector("#reviewTable tbody");
    document.getElementById("reviewForm").style.display = "block";
    tableBody.innerHTML = "";

    const fields = [
        {id: "firstName",       name: "First Name"},
        {id: "middleInitial",   name: "Middle Initial"},
        {id: "lastName",        name: "Last Name"},
        {id: "dob",             name: "Date of Birth"},
        {id: "phone",           name: "Phone"},
        {id: "ssn",             name: "Social Security Number"},
        {id: "email",           name: "Email"},
        {id: "address1",        name: "Address Line 1"},
        {id: "address2",        name: "Address Line 2"},
        {id: "city",            name: "City"},
        {id: "state",           name: "State"},
        {id: "zip",             name: "ZIP Code"},
        {id: "userid",          name: "User ID"},
        {id: "password",        name: "Password"},
        {id: "confirmPassword", name: "Confirm Password"},
        {id: "symptoms",        name: "Symptoms"}
    ];

    fields.forEach(f => {
        const element  = document.getElementById(f.id);
        const rawValue = element.value.trim();
        let status = "";
        let reason = "";

        if (f.id === "userid") {
            if (rawValue === "") {
                status = "ERROR"; reason = "Required Field";
            } else if (/^[A-Za-z][A-Za-z0-9_-]{4,29}$/.test(rawValue)) {
                status = "PASS";
            } else {
                status = "ERROR"; reason = "Must start with a letter, 5-30 characters, no spaces or special characters";
            }
        } else if (f.id === "confirmPassword") {
            const password = document.getElementById("password").value;
            if (rawValue === "") {
                status = "ERROR"; reason = "Required Field";
            } else if (rawValue !== password) {
                status = "ERROR"; reason = "Passwords do not match";
            } else {
                status = "PASS";
            }
        } else if (f.id === "ssn") {
            if (rawValue === "") {
                status = "ERROR"; reason = "Required Field";
            } else if (/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(rawValue)) {
                status = "PASS";
            } else {
                status = "ERROR"; reason = "Must be in format 000-00-0000";
            }
        } else if (element.required && rawValue === "") {
            status = "ERROR"; reason = "Required Field";
        } else {
            const patternAttr = element.getAttribute("pattern");
            if (patternAttr && rawValue !== "") {
                const regex = new RegExp("^" + patternAttr + "$");
                status = regex.test(rawValue) ? "PASS" : "ERROR";
                if (status === "ERROR") reason = element.title || "Invalid format";
            } else {
                status = element.checkValidity() ? "PASS" : "ERROR";
                if (status === "ERROR") reason = element.title || "Invalid input";
            }
        }

        // Mask sensitive fields
        let displayCell;
        if (f.id === "ssn" || f.id === "password" || f.id === "confirmPassword") {
            displayCell = rawValue ? "••••••••" : "N/A";
        } else {
            displayCell = rawValue || "N/A";
        }

        const statusCell = reason !== "" ? `${status}: ${reason}` : status;
        tableBody.innerHTML += `<tr>
            <td>${f.name}</td>
            <td>${displayCell}</td>
            <td class="${status}">${statusCell}</td>
        </tr>`;
    });

    // Checkboxes
    const checkboxes = document.querySelectorAll('input[name="conditions"]:checked');
    const checkboxDisplay = checkboxes.length > 0
        ? Array.from(checkboxes).map(cb => cb.value).join(", ")
        : "N/A";
    tableBody.innerHTML += `<tr>
        <td>Conditions</td>
        <td>${checkboxDisplay}</td>
        <td class="PASS">PASS</td>
    </tr>`;

    // Radio buttons
    const radioGroups = [
        {name: "gender",     label: "Gender"},
        {name: "vaccinated", label: "Vaccinated"},
        {name: "insurance",  label: "Insurance"}
    ];

    radioGroups.forEach(group => {
        const selected        = document.querySelector(`input[name="${group.name}"]:checked`);
        const radioValue      = selected ? selected.value : "N/A";
        const radioStatus     = selected ? "PASS" : "ERROR";
        const radioReason     = selected ? "" : "Required Field";
        const radioStatusCell = radioReason ? `${radioStatus}: ${radioReason}` : radioStatus;
        tableBody.innerHTML += `<tr>
            <td>${group.label}</td>
            <td>${radioValue}</td>
            <td class="${radioStatus}">${radioStatusCell}</td>
        </tr>`;
    });
}

function closeReviewForm() {
    document.getElementById("reviewForm").style.display = "none";
}