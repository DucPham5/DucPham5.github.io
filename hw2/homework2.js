// ── Helper Functions ────────────────────────────────────
function showError(id, msg) {
    document.getElementById(id).innerHTML = msg;
}
function clearError(id) {
    document.getElementById(id).innerHTML = "<span class='successMsg'>&#10003;</span>";
}

// ── Individual Validate Modules ─────────────────────────

function validateFirstName() {
    const value = document.getElementById("firstName").value.trim();
    if (value === "") {
        showError("firstNameMsg", "First name is required");
    } else if (!/^[A-Za-z'-]{1,30}$/.test(value)) {
        showError("firstNameMsg", "Letters only, apostrophes and dashes allowed");
    } else {
        clearError("firstNameMsg");
    }
}

function validateMiddleInitial() {
    const value = document.getElementById("middleInitial").value.trim();
    if (value !== "" && !/^[A-Za-z]$/.test(value)) {
        showError("middleInitialMsg", "Must be one letter only");
    } else {
        document.getElementById("middleInitialMsg").innerHTML = "";
    }
}

function validateLastName() {
    const value = document.getElementById("lastName").value.trim();
    if (value === "") {
        showError("lastNameMsg", "Last name is required");
    } else if (!/^[A-Za-z'2-5-]{1,30}$/.test(value)) {
        showError("lastNameMsg", "Letters, apostrophes, dashes, numbers 2-5 only");
    } else {
        clearError("lastNameMsg");
    }
}

function validateDOB() {
    const value = document.getElementById("dob").value;
    const today = new Date();
    const dob = new Date(value);
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (value === "") {
        showError("dobMsg", "Date of birth is required");
    } else if (dob > today) {
        showError("dobMsg", "Date of birth cannot be in the future");
    } else if (dob < minDate) {
        showError("dobMsg", "Cannot be more than 120 years ago");
    } else {
        clearError("dobMsg");
    }
}

function validatePhone() {
    const value = document.getElementById("phone").value.trim();
    if (value === "") {
        showError("phoneMsg", "Phone number is required");
    } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)) {
        showError("phoneMsg", "Format must be 000-000-0000");
    } else {
        clearError("phoneMsg");
    }
}

function validateSSN() {
    const value = document.getElementById("ssn").value.trim();
    if (value === "") {
        showError("ssnMsg", "SSN is required");
    } else if (!/^[0-9]{7}$/.test(value)) {
        showError("ssnMsg", "SSN must be exactly 7 digits");
    } else {
        clearError("ssnMsg");
    }
}

function validateEmail() {
    const value = document.getElementById("email").value.trim();
    if (value === "") {
        showError("emailMsg", "Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError("emailMsg", "Enter a valid email: name@domain.tld");
    } else {
        clearError("emailMsg");
    }
}

function validateAddress1() {
    const value = document.getElementById("address1").value.trim();
    if (value === "") {
        showError("address1Msg", "Address line 1 is required");
    } else if (value.length < 2 || value.length > 30) {
        showError("address1Msg", "Must be 2-30 characters");
    } else {
        clearError("address1Msg");
    }
}

function validateAddress2() {
    const value = document.getElementById("address2").value.trim();
    if (value !== "" && (value.length < 2 || value.length > 30)) {
        showError("address2Msg", "Must be 2-30 characters if entered");
    } else {
        document.getElementById("address2Msg").innerHTML = "";
    }
}

function validateCity() {
    const value = document.getElementById("city").value.trim();
    if (value === "") {
        showError("cityMsg", "City is required");
    } else if (value.length < 2 || value.length > 30) {
        showError("cityMsg", "Must be 2-30 characters");
    } else {
        clearError("cityMsg");
    }
}

function validateState() {
    const value = document.getElementById("state").value;
    if (value === "") {
        showError("stateMsg", "State is required");
    } else {
        clearError("stateMsg");
    }
}

function validateZip() {
    const value = document.getElementById("zip").value.trim();
    if (value === "") {
        showError("zipMsg", "ZIP code is required");
    } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
        showError("zipMsg", "ZIP must be 5 digits or 00000-0000 format");
    } else {
        clearError("zipMsg");
    }
}

function validateSymptoms() {
    document.getElementById("symptomsMsg").innerHTML = "";
}

function validateUserID() {
    const value = document.getElementById("userid").value.trim();
    if (value === "") {
        showError("useridMsg", "User ID is required");
    } else if (!/^[A-Za-z][A-Za-z0-9_-]{4,29}$/.test(value)) {
        showError("useridMsg", "5-30 characters. Must start with a letter. No spaces or special characters.");
    } else {
        clearError("useridMsg");
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const userid = document.getElementById("userid").value.toLowerCase();
    const firstName = document.getElementById("firstName").value.toLowerCase();
    const lastName = document.getElementById("lastName").value.toLowerCase();

    if (password === "") {
        showError("passwordMsg", "Password is required");
    } else if (password.length < 8 || password.length > 30) {
        showError("passwordMsg", "Password must be 8-30 characters");
    } else if (!/[A-Z]/.test(password)) {
        showError("passwordMsg", "Must contain at least 1 uppercase letter");
    } else if (!/[a-z]/.test(password)) {
        showError("passwordMsg", "Must contain at least 1 lowercase letter");
    } else if (!/[0-9]/.test(password)) {
        showError("passwordMsg", "Must contain at least 1 number");
    } else if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(password)) {
        showError("passwordMsg", "Must contain at least 1 special character");
    } else if (/["']/.test(password)) {
        showError("passwordMsg", "Password cannot contain quotes");
    } else if (userid !== "" && password.toLowerCase() === userid) {
        showError("passwordMsg", "Password cannot be the same as your User ID");
    } else if (userid !== "" && password.toLowerCase().includes(userid)) {
        showError("passwordMsg", "Password cannot contain your User ID");
    } else if (firstName !== "" && password.toLowerCase().includes(firstName)) {
        showError("passwordMsg", "Password cannot contain your first name");
    } else if (lastName !== "" && password.toLowerCase().includes(lastName)) {
        showError("passwordMsg", "Password cannot contain your last name");
    } else {
        clearError("passwordMsg");
    }
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword === "") {
        showError("confirmPasswordMsg", "Please re-enter your password");
    } else if (confirmPassword !== password) {
        showError("confirmPasswordMsg", "Passwords do not match");
    } else {
        document.getElementById("confirmPasswordMsg").innerHTML = "<span class='successMsg'>&#10003; Passwords match</span>";
    }
}

// ── Submit: recalls every module ────────────────────────
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
    validateUserID();
    validatePassword();
    validateConfirmPassword();
    convertUserID();
}

// ── Existing Functions ──────────────────────
function updateHealth(value) {
    document.getElementById("healthValue").innerHTML = value;
}

function convertUserID() {
    const userid = document.getElementById("userid");
    userid.value = userid.value.toLowerCase();
}

function reviewForm(){
    const tableBody = document.querySelector("#reviewTable tbody");
    document.getElementById("reviewForm").style.display = "block";
    tableBody.innerHTML = "";
    const fields = [
        {id: "firstName", name: "First Name"},
        {id: "middleInitial", name: "Middle Initial"},
        {id: "lastName", name: "Last Name"},
        {id: "dob", name: "Date of Birth"},
        {id: "phone", name: "Phone"},
        {id: "ssn", name: "Social Security Number"},
        {id: "email", name: "Email"},
        {id: "address1", name: "Address Line 1"},
        {id: "address2", name: "Address Line 2"},
        {id: "city", name: "City"},
        {id: "state", name: "State"},
        {id: "zip", name: "ZIP Code"},
        {id: "userid", name: "User ID"},
        {id: "password", name: "Password"},
        {id: "confirmPassword", name: "Confirm Password"},
        {id: "symptoms", name: "Symptoms"}
    ];

    fields.forEach(f => {
        const element = document.getElementById(f.id);
        const rawValue = element.value.trim();
        const value = rawValue || "N/A";
        let status = "";
        let reason = "";

        if (f.id === "userid") {
            if (rawValue === "") {
                status = "ERROR";
                reason = "Required Field";
            } else {
                const useridRegex = new RegExp("^[A-Za-z][A-Za-z0-9_-]{4,29}$");
                if (useridRegex.test(rawValue)) {
                    status = "PASS";
                } else {
                    status = "ERROR";
                    reason = "Must start with a letter, 5-30 characters, no spaces or special characters";
                }
            }
        }
        else if (f.id === "confirmPassword") {
            const password = document.getElementById("password").value;
            if (rawValue === "") {
                status = "ERROR";
                reason = "Required Field";
            } else if (rawValue !== password) {
                status = "ERROR";
                reason = "Passwords do not match";
            } else {
                status = "PASS";
            }
        }
        else if (element.required && rawValue === "") {
            status = "ERROR";
            reason = "Required Field";
        }
        else {
            const patternAttr = element.getAttribute("pattern");
            if (patternAttr && rawValue !== "") {
                const regex = new RegExp("^" + patternAttr + "$");
                if (regex.test(rawValue)) {
                    status = "PASS";
                } else {
                    status = "ERROR";
                    reason = element.title || "Invalid format";
                }
            } else {
                if (element.checkValidity()) {
                    status = "PASS";
                } else {
                    status = "ERROR";
                    reason = element.title || "Invalid input";
                }
            }
        }

        let displayValue;
        if (rawValue.length === 0) {
            displayValue = "N/A";
        } else if (rawValue.length > 5) {
            displayValue = rawValue.slice(0, 5);
        } else {
            displayValue = rawValue;
        }

        let displayCell;
        if (f.id === "zip") {
            displayCell = displayValue;
        } else {
            displayCell = value;
        }

        let statusCell;
        if (reason !== "") {
            statusCell = status + ": " + reason;
        } else {
            statusCell = status;
        }

        const row = `<tr>
                        <td>${f.name}</td>
                        <td>${displayCell}</td>
                        <td class="${status}">${statusCell}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });

    // Checkboxes
    const checkboxes = document.querySelectorAll('input[name="conditions"]:checked');
    let checkboxDisplay;
    if (checkboxes.length > 0) {
        checkboxDisplay = Array.from(checkboxes).map(cb => cb.value).join(", ");
    } else {
        checkboxDisplay = "N/A";
    }
    tableBody.innerHTML += `<tr>
                                <td>Conditions</td>
                                <td>${checkboxDisplay}</td>
                                <td class="PASS">PASS</td>
                            </tr>`;

    // Radio buttons
    const radioGroups = [
        {name: "gender", label: "Gender"},
        {name: "vaccinated", label: "Vaccinated"},
        {name: "insurance", label: "Insurance"}
    ];

    radioGroups.forEach(group => {
        const selected = document.querySelector(`input[name="${group.name}"]:checked`);
        let radioValue;
        let radioStatus;
        let radioReason;

        if (selected) {
            radioValue = selected.value;
            radioStatus = "PASS";
            radioReason = "";
        } else {
            radioValue = "N/A";
            radioStatus = "ERROR";
            radioReason = "Required Field";
        }

        let radioStatusCell;
        if (radioReason !== "") {
            radioStatusCell = radioStatus + ": " + radioReason;
        } else {
            radioStatusCell = radioStatus;
        }

        tableBody.innerHTML += `<tr>
                                    <td>${group.label}</td>
                                    <td>${radioValue}</td>
                                    <td class="${radioStatus}">${radioStatusCell}</td>
                                </tr>`;
    });
}

function closeReviewForm(){
    document.getElementById("reviewForm").style.display = "none";
}