function reviewForm(){
    const tableBody = document.querySelector("#reviewTable tbody");
    document.getElementById("reviewForm").style.display = "block";
    tableBody.innerHTML = "";
    // List of fields to check
    const fields = [
        {id: "firstName", name: "First Name"},
        {id: "middleInitial", name: "Middle Initial"},
        {id: "lastName", name: "Last Name"},
        {id: "dob", name: "Date of Birth"},
        {id: "phone", name: "Phone"},
        {id: "ssn", name: "SSN"},
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
        let status = ""
        let reason = ""; //error reason

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
                    reason = "Must start with a letter, 5–30 characters, no spaces or special characters";
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
            status = "ERROR"; // required field empty
            reason = "Required Field";
        } 
        else {
            // Check if there is a pattern on the element
            const patternAttr = element.getAttribute("pattern");
            if (patternAttr && rawValue !== "") {
                const regex = new RegExp("^" + patternAttr + "$");
                if (regex.test(rawValue)) {
                    status = "PASS";
                } 
                else {
                    status = "ERROR";
                    reason = element.title || "Invalid format";
                }
            } 
            else {
                // fallback to simple HTML validity check
                if (element.checkValidity()) {
                    status = "PASS";
                } 
                else {
                    status = "ERROR";
                    reason = element.title || "Invalid input";
                }
            }
        }

        // Truncate to first 5 digits for display
        let displayValue;
        if (rawValue.length === 0) {
            displayValue = "N/A";
        } else if (rawValue.length > 5) {
            displayValue = rawValue.slice(0, 5);
        } else {
            displayValue = rawValue;
        }



        // Add row to the table
        const row = `<tr>
                        <td>${f.name}</td>
                        <td>${f.id === 'zip' ? displayValue : value}</td>
                        <td class="${status}">${status}${reason ? ": " + reason : ""}</td>
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
function convertUserID() {
    const userid = document.getElementById("userid");
    userid.value = userid.value.toLowerCase();
}
function updateHealth(value) {
    document.getElementById("healthValue").innerHTML = value;
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const userid = document.getElementById("userid").value.toLowerCase();
    const firstName = document.getElementById("firstName").value.toLowerCase();
    const lastName = document.getElementById("lastName").value.toLowerCase();
    const passwordMsg = document.getElementById("passwordMsg");
    const confirmPasswordMsg = document.getElementById("confirmPasswordMsg");

    passwordMsg.innerHTML = "";
    confirmPasswordMsg.innerHTML = "";

    // Length check
    if (password.length < 8 || password.length > 30) {
        passwordMsg.innerHTML = "Password must be 8–30 characters";
        return;
    }

    // Uppercase check
    if (!/[A-Z]/.test(password)) {
        passwordMsg.innerHTML = "Password must contain at least 1 uppercase letter";
        return;
    }

    // Lowercase check
    if (!/[a-z]/.test(password)) {
        passwordMsg.innerHTML = "Password must contain at least 1 lowercase letter";
        return;
    }

    // Number check
    if (!/[0-9]/.test(password)) {
        passwordMsg.innerHTML = "Password must contain at least 1 number";
        return;
    }

    // Special character check
    if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(password)) {
        passwordMsg.innerHTML = "Password must contain at least 1 special character";
        return;
    }

    // No quotes check
    if (/["']/.test(password)) {
        passwordMsg.innerHTML = "Password cannot contain quotes";
        return;
    }

    // Cannot equal userid
    if (password.toLowerCase() === userid) {
        passwordMsg.innerHTML = "Password cannot be the same as your User ID";
        return;
    }

    // Cannot contain userid
    if (userid !== "" && password.toLowerCase().includes(userid)) {
        passwordMsg.innerHTML = "Password cannot contain your User ID";
        return;
    }

    // Cannot contain first or last name
    if (firstName !== "" && password.toLowerCase().includes(firstName)) {
        passwordMsg.innerHTML = "Password cannot contain your first name";
        return;
    }

    if (lastName !== "" && password.toLowerCase().includes(lastName)) {
        passwordMsg.innerHTML = "Password cannot contain your last name";
        return;
    }

    // Passwords match check
    if (confirmPassword !== "" && password !== confirmPassword) {
        confirmPasswordMsg.innerHTML = "Passwords do not match";
        return;
    }

    if (confirmPassword !== "" && password === confirmPassword) {
        confirmPasswordMsg.innerHTML = "✓ Passwords match";
        confirmPasswordMsg.style.color = "green";
    }
}