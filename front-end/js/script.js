const pages = {}

pages.base_url = "http://localhost/ClassroomClone/back-end/";

// Common Functions
pages.print_message = (message) => {
    console.log(message);
}

pages.getAPI = async(url) => {
    try {
        return await axios(url)
    } catch (error) {
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async(api_url, api_data) => {
    try {
        return await axios.post(api_url, api_data);
    } catch (error) {
        pages.print_message("Error from Linking (POST)" + error)
    }
}

pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}

pages.page_index = () => {

    const nextButton = document.querySelector(".next-button")
    const emailInput = document.getElementById("email")
    const error = document.querySelector(".error")

    nextButton.addEventListener("click", async() => {
        const emailData = emailInput.value;
        const data = new FormData()
        data.append("email", emailData)

        if (emailData !== "") {
            const response = await axios.post(pages.base_url + "check-email.php", data);
            if (response.data.status === "Failure") {
                error
                    .classList
                    .remove("hide")
                setTimeout(() => {
                    error
                        .classList
                        .add("hide");
                }, 3000)
            } else {
                localStorage.setItem("userEmail", JSON.stringify(emailData))
                window.location.href = "signin_password.html"
            }
        }
    })

    // const login = document.getElementById("login")
    // login.addEventListener("click", async() => {     const email = document
    // .getElementById("email_in")         .value     const password = document
    // .getElementById("password_in")         .value     const errorElement =
    // document.querySelector(".error")     const data = new FormData();
    // data.append("email", email);     data.append("password", password)     try {
    // let response = await pages.postAPI(pages.base_url + "signin.php", data); if
    // (response.data.status === "user not found") { errorElement.innerText = "User
    // not found"             setTimeout(() => { errorElement.innerText = "" },
    // 3000)         } else if (response.data.status === "wrong password") {
    // errorElement.innerText = "Wrong Password" setTimeout(() => {
    // errorElement.innerText = ""             }, 3000)         } else { const
    // userObject = Object .keys(response.data) .reduce((acc, key) => {    if (key
    // !== "status") {     acc[key] = response.data[key]             }    return acc
    // }, {}) localStorage.setItem("userData", JSON.stringify(userObject))
    // window.location.href = "classrooms.html" }     } catch (error) {
    // console.error('Login error : ', error);     } })
}

pages.page_signup = () => {

    const signup = document.getElementById("signup");

    signup.addEventListener("click", () => {
        const first_name = document
            .getElementById("first_name")
            .value;
        const last_name = document
            .getElementById("last_name")
            .value;
        const email = document
            .getElementById("email")
            .value;
        const password = document
            .getElementById("password")
            .value;
        const answer = document
            .getElementById("answer")
            .value;

        const signup_select = document.getElementById("signup_select");
        const selected_value = signup_select.value;
        let roleValue;

        if (selected_value === "teacher") {
            roleValue = 1;
        } else if (selected_value === "student") {
            roleValue = 2;
        } else {
            roleValue = 2;
        }

        try {
            const data = new FormData();
            data.append("first_name", first_name);
            data.append("last_name", last_name);
            data.append("email", email);
            data.append("password", password);
            data.append("answer", answer);
            data.append("role_id", roleValue);

            fetch("http://localhost/ClassroomClone/back-end/signup.php", {
                method: "POST",
                body: data

            });
            window.location.href = "/index.html"
        } catch (error) {
            console.log(error);
        }
    });
}

pages.page_classrooms = () => {

    const burgerIcon = document.getElementById("burgerIcon");
    const sidebar = document.getElementById("sidebar");
    const sidebarClasses = document.querySelector(".sidebar .classes")
    const bottom_classrooms = document.querySelector(".bottom-classrooms");
    const joinClassButton = document.querySelector(".join-class")
    const createClassButton = document.querySelector(".create-class")
    const modalCreateButton = document.querySelector(".modal .buttons .create-button")
    const modalCancelButton = document.querySelector(".modal .buttons .cancel-button")
    const classname_input = document.getElementById("classname-input")
    const section_input = document.getElementById("section-input");
    const subject_input = document.getElementById("subject-input");
    const room_input = document.getElementById("room-input");
    const googleMeetLinkInput = document.getElementById("googleMeetLink-input");
    const formElement = document.querySelector("form")
    const signoutElement = document.getElementById("sign-out")

    let userData = JSON.parse(localStorage.getItem("userData"))

    burgerIcon.addEventListener("click", () => {
        sidebar
            .classList
            .remove("hide");
    });

    document
        .body
        .addEventListener("click", (e) => {
            if (!sidebar.classList.contains("hide") && !e.target.classList.contains("burger-icon") && !sidebar.contains(e.target)) {
                sidebar
                    .classList
                    .add("hide");
            }
        })

    //Display Classes in classrooms

    const user_id = JSON
        .parse(localStorage.getItem("userData"))
        .user_id
    const data = new FormData();
    data.append("user_id", user_id);

    try {

        let getClasses = async() => {

            let response = await pages.postAPI(pages.base_url + "teachers-classes.php", data);

            response
                .data
                .map((item) => {
                    sidebarClasses.innerHTML += `<div class="class">
                        <div>${item.class_name[0]}</div>
                        <div class="class-data">
                            <p class="class-name">
                                ${item.class_name}
                            </p>
                            <p class="class-desc">${item.section}</p>
                        </div>
                    </div>`

                    bottom_classrooms.innerHTML += `<a href="/teacher_stream.html?id=${item.class_id}"><div class="class">
                    <div class="top-class">
                        <div class="class-title">
                            <p>${item.class_name}</p>
                            <div>
                                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                            </div>
                        </div>
                        <p>${item.room || ""}</p>
                        <p>${userData.first_name + userData.last_name}</p>
                        <div class="profile-pic"><img
                            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
                            alt="Profile Picture"></div>
                    </div>
                    <div class="assignments">
                        <div class="assignment">
                            <p class="due-date">Due today</p>
                            <p>11:59PM - Professional Development Plan</p>
                        </div>
                        <div class="assignment">
                            <p class="due-date">Due tomorrow</p>
                            <p>11:59PM - Planners(Time Management)</p>
                        </div>
                    </div>
                    <div class="bottom-class">
                        <div class="user-icon">
                            <i class="fa-regular fa-user fa-lg"></i>
                        </div>
                        <div class="folder-icon">
                            <i class="fa-regular fa-folder fa-lg"></i>
                        </div>
                    </div>
                </div></a>`;
                })
        }
        getClasses()

        // checking for the user to set the button in the navbar
        let userRole = JSON
            .parse(localStorage.getItem("userData"))
            .role_id

        if (userRole === 1) {
            joinClassButton
                .classList
                .add("hide")
        } else {
            createClassButton
                .classList
                .add("hide")
        }

    } catch (error) {
        console.log(error + " in loading classes")
    }

    // create class modal functionlity

    const modal = document.querySelector(".modal")
    const boxModal = document.querySelector(".modal .modal-box")
    modal.addEventListener("click", (e) => {
        if (!boxModal.contains(e.target)) {
            modal
                .classList
                .toggle("hide");
        }
    })

    createClassButton.addEventListener('click', () => {
        modal
            .classList
            .remove("hide")
    })

    modalCancelButton.addEventListener("click", () => {
        modal
            .classList
            .add("hide")
    })

    // function to create class code
    function generateRandomCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        const codeLength = 7;

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        return code;
    }

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();

        const classname = classname_input.value;
        const section = section_input.value;
        const subject = subject_input.value;
        const room = room_input.value;
        const googleMeetLink = googleMeetLinkInput.value;
        const classCode = generateRandomCode();

        let classData = new FormData();
        classData.append("class_name", classname);
        classData.append("section", section);
        classData.append("subject", subject);
        classData.append("room", room);
        classData.append("googlemeet_link", googleMeetLink);
        classData.append("class_code", classCode);
        classData.append("user_id", user_id);

        try {
            const createClass = async() => {
                const response = await pages.postAPI(pages.base_url + "create-class.php", classData);
                console.log(response.data);
                modal
                    .classList
                    .add("hide");
                window
                    .location
                    .reload();
            };
            createClass();
        } catch (error) {
            console.log(error);
        }
    });

    // manage account modal functionality
    const profileBtn = document.getElementById("profile-pic");
    const manageAccountModal = document.getElementById("manage-account-modal");
    const manageAccountButton = document.querySelector(".manage-account-button")

    profileBtn.addEventListener('click', () => {
        manageAccountModal
            .classList
            .remove("hide")
    })

    manageAccountButton.addEventListener("click", () => {
        window.location.href = "manage_account.html"
    })

    document
        .body
        .addEventListener("click", (e) => {
            if (!manageAccountModal.classList.contains("hide") && !profileBtn.contains(e.target) && !manageAccountModal.contains(e.target)) {
                manageAccountModal
                    .classList
                    .add("hide");
            }
        });

    // sign Out functionality
    signoutElement.addEventListener("click", () => {
        localStorage.removeItem("userData")
        window.location.href = "index.html"
    })

    // join class modal functionality
    const joinClassModal = document.getElementById("join-class-modal")
    const closeJoinModalButton = document.querySelector(".close-join-class-icon");
    const joinClassName = document.querySelector(".join-class-modal-bottom .name");
    const joinClassEmail = document.querySelector(".join-class-modal-bottom .email");

    let userEmail = JSON
        .parse(localStorage.getItem("userData"))
        .email
    let userName = JSON
        .parse(localStorage.getItem("userData"))
        .first_name + " " + JSON
        .parse(localStorage.getItem("userData"))
        .last_name

    joinClassName.innerText = userName
    joinClassEmail.innerText = userEmail

    joinClassButton.addEventListener("click", () => {
        joinClassModal
            .classList
            .remove("hide")
        document
            .body
            .classList
            .add("no-overflow")
    })

    closeJoinModalButton.addEventListener("click", () => {
        joinClassModal
            .classList
            .add("hide")
        document
            .body
            .classList
            .remove("no-overflow");
    })

};

pages.page_teacher_stream = () => {

    const annoucementInput = document.getElementById("announcement-input")
    const firstStateAnnouncement = document.getElementById("first-state-announcement")
    const secondStateAnnoucnement = document.getElementById("second-state-announcement")
    const cancelButton = document.querySelector("#second-state-announcement .buttons .cancel-button")
    const postButton = document.querySelector(".post-button")
    const editor = document.querySelector("#editor p")

    firstStateAnnouncement.addEventListener('click', () => {
        firstStateAnnouncement
            .classList
            .add("hide")
        secondStateAnnoucnement
            .classList
            .remove("hide")
        annoucementInput
            .classList
            .add("text-area")

        cancelButton.addEventListener("click", () => {
            secondStateAnnoucnement
                .classList
                .add("hide")
            firstStateAnnouncement
                .classList
                .remove("hide")
            annoucementInput
                .classList
                .remove("text-area")
        })
    })

    const profileBtn = document.getElementById("profile-pic")
    const manage_profile = document.getElementById("profile-manage");
    profileBtn.addEventListener("click", () => {
        console.log("Click profile successful");
        if (manage_profile.style.display !== "none") {
            manage_profile.style.display = "none";
        } else {
            manage_profile.style.display = "block";
        }
    })

};

pages.page_teacher_classwork = () => {
    const createButton = document.getElementById("create-button");
    const dropDown = document.getElementById("drop-down");
    const topicModal = document.getElementById("topic-modal");
    const createTopicButton = document.getElementById("create-topic-button");
    const createAssignmentButton = document.getElementById("create-assignment-button");
    const boxTopicModal = document.getElementById("topic-box");
    const topicCancelButton = document.querySelector(".add-topic-modal .cancel-button");
    const assignmentModal = document.getElementById("modal-assignment");
    const closeAssignmentButton = document.getElementById("close-assignment");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const checkboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');
    let checkedValues = [];

    let classID = 88;

    // close assignment
    closeAssignmentButton.addEventListener("click", (e) => {
        assignmentModal
            .classList
            .add("hide");
    });

    // open assignment
    createAssignmentButton.addEventListener("click", (e) => {
        assignmentModal
            .classList
            .remove("hide");
    });

    createButton.addEventListener("click", (e) => {
        if (!dropDown.contains(e.target)) {
            dropDown
                .classList
                .remove("hide");
        }
        console.log("bottom clicked");
    });

    document.addEventListener("click", (e) => {
        if (!createButton.contains(e.target) && !createButton.contains(e.target)) {
            dropDown
                .classList
                .add("hide");
        }
    });

    createTopicButton.addEventListener("click", (e) => {
        dropDown
            .classList
            .add("hide");
        topicModal
            .classList
            .remove("hide");
    });

    topicModal.addEventListener("click", (e) => {
        if (!boxTopicModal.contains(e.target)) {
            topicModal
                .classList
                .add("hide");
        }
    });

    topicCancelButton.addEventListener("click", (e) => {
        topicModal
            .classList
            .add("hide");
    });

    const topicsSelectBox = document.getElementById("topics");
    topicsSelectBox.innerHTML += `<option value="null">No topic</option>`;

    // get the topics fo the class and display them
    try {
        let getTopics = async() => {
            const data = new FormData();
            data.append("class_id", classID);
            let response = await pages.postAPI(pages.base_url + "fetch_topics.php", data);
            response
                .data
                .map((item) => {
                    topicsSelectBox.innerHTML += `<option value="${item.topic_id}">${item.topic_name}</option>`;
                });
        };
        getTopics();
    } catch (error) {
        console.log(error);
    }

    // assignment sidebar
    const dropdownToggle = document.getElementById("dropdownToggle");
    // const dropdownMenu = document.getElementById("dropdownMenu");
    const dropDownClasses = document.getElementById("dropdownMenu")
    const userId = JSON
        .parse(localStorage.getItem("userData"))
        .user_id

    // const checkboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');

    const data = new FormData()
    data.append("user_id", userId)

    dropDownClasses.innerHTML += `<div class="dropdown-item">
                                        <label><input disabled checked type="checkbox" value="${classID}">
                                            Dynamic Class</label>
                                    </div>`;
    checkedValues.push(classID)
    dropdownToggle.innerHTML = `<div>Dynamic Class</div><div><i class="fa-solid fa-caret-down"></i></div>`;

    // get the classes and display them
    try {
        let getClasses = async() => {
            let response = await pages.postAPI(pages.base_url + "teachers-classes.php", data)
            response
                .data
                .map((item, index) => {
                    if (item.class_id !== classID) {
                        dropDownClasses.innerHTML += `<div class="dropdown-item">
                                            <label><input type="checkbox" value="${item.class_id}">
                                                ${item.class_name}</label>
                                        </div>`;
                    }
                })
            console.log(response.data)
        }
        getClasses()
    } catch (error) {
        console.log(error)
    }

    dropdownToggle.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block"
            ? "none"
            : "block";
    });

    // classes let checkedValues = [] const checkboxes =
    // dropdownMenu.querySelectorAll('input[type="checkbox"]');

    dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();

        checkedValues = [];
        const checkboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedValues.push(checkbox.value);
            }
        });
        console.log(checkedValues);
    });

    // create assignment functinality
    const assignButton = document.getElementById("assign-button")
    const assignmentTitleInput = document.querySelector(".assignment-title")
    const instructionsInput = document.querySelector("#editor p")
    const dateInput = document.getElementById("dateInput")

    assignButton.addEventListener("click", async() => {

        try {
            for (let i = 0; i < checkedValues.length; i++) {
                let data = new FormData();
                let dueDate = dateInput.value;
                dueDate == ""
                    ? (dueDate = "No due date")
                    : (dueDate = dueDate);

                // get the current date
                const currentDate = new Date();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                let date = `${month}-${day}-${hours}-${minutes}`;

                data.append("launch_date", date);
                data.append("title", assignmentTitleInput.value);
                data.append("instructions", instructionsInput.innerHTML);
                data.append("user_id", JSON.parse(localStorage.getItem("userData")).user_id);
                data.append("class_id", checkedValues[i])
                data.append("due_date", dueDate)

                let response = await pages.postAPI(pages.base_url + "create-assignment.php", data);
                window.location.href = "teacher_classwork.html"
            }
        } catch (error) {
            console.log(error)
        }
    })

    assignmentTitleInput.addEventListener("input", () => {
        assignButton.disabled = false
        assignButton
            .classList
            .add("active")

        if (assignmentTitleInput.value === "") {
            assignButton.disabled = true;
            assignButton
                .classList
                .remove("active");
        }
    })

    // setInterval(() => {     console.log(checkedValues);
    // console.log(dateInput.value);     console.log(topicsSelect.value) }, 1000);
    // setInterval(() => {     console.log(instructionsInput.innerHTML);
    // console.log(assignmentInput.value); }, 1500);
}

pages.page_signin_password = () => {
    const showPasswordCheckBox = document.getElementById("show-password-input");
    const passwordInput = document.getElementById("password_input")
    const loginButton = document.getElementById("login-button")
    let error = document.querySelector(".error")

    showPasswordCheckBox.addEventListener("change", function () {
        if (showPasswordCheckBox.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    let userEmail = JSON.parse(localStorage.getItem("userEmail"))

    loginButton.addEventListener('click', async() => {

        let password = passwordInput.value;

        let data = new FormData();
        data.append("email", userEmail);
        data.append("password", password);

        let response = await axios.post(pages.base_url + "signin.php", data)
        console.log(response.data)
        if (response.data.status === "wrong password") {
            error
                .classList
                .remove("hide")
            setTimeout(() => {
                error
                    .classList
                    .add("hide")
            }, 3000)
        } else {
            const userObject = Object
                .keys(response.data)
                .reduce((acc, key) => {
                    if (key !== "status") {
                        acc[key] = response.data[key];
                    }
                    return acc;
                }, {});
            localStorage.removeItem('userEmail')
            localStorage.setItem("userData", JSON.stringify(userObject))
            window.location.href = "classrooms.html"
        }
    })
}

pages.page_forget_password = () => {

    const userEmail = JSON.parse(localStorage.getItem('userEmail'))
    const emailElement = document.querySelector(".email")
    const answerInput = document.getElementById("fav-color")
    const checkButton = document.getElementById("check-button")
    const changePasswordButton = document.getElementById("change-password-button")
    const answerError = document.querySelector(".answer-error")
    const passwordsError = document.querySelector(".passwords-error")
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")

    emailElement.innerText = userEmail

    checkButton.addEventListener("click", async() => {
        console.log("checked")
        let answer = answerInput.value

        if (answer !== "") {
            let data = new FormData();
            data.append("email", userEmail);
            data.append("answer", answer);

            let response = await axios.post(pages.base_url + "check-answer.php", data);
            console.log(response.data);
            if (response.data.answer_check === "Wrong answer") {
                answerError
                    .classList
                    .remove("hide")
                setTimeout(() => {
                    answerError
                        .classList
                        .add("hide")
                }, 3000)
            } else {
                answerInput.value = ""
                answerInput.disabled = true
                checkButton
                    .classList
                    .add("hide")
                changePasswordButton
                    .classList
                    .remove("hide")
                passwordInput.disabled = false
                confirmPasswordInput.disabled = false
            }
        }
    })

    changePasswordButton.addEventListener("click", async() => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordsError
                .classList
                .remove("hide")
            setTimeout(() => {
                passwordsError
                    .classList
                    .add("hide")
            }, 3000)
        } else {
            let data = new FormData()
            data.append("email", userEmail)
            data.append("new password", passwordInput.value)

            let response = await axios.post(pages.base_url + "change-password.php", data)
            window.location.href = "index.html"
        }
    })

}

pages.page_manage_account = () => {
    const emailElement = document.querySelector(".email");
    const firstNameElement = document.getElementById("first-name");
    const lastNameElement = document.getElementById("last-name");
    const applyChangesButton = document.getElementById("apply-changes-button");

    let user_id = JSON
        .parse(localStorage.getItem("userData"))
        .user_id;
    let user_email = JSON
        .parse(localStorage.getItem("userData"))
        .email;
    emailElement.innerText = user_email;

    applyChangesButton.addEventListener("click", async() => {
        let firstName = firstNameElement.value;
        let lastName = lastNameElement.value;

        let data = new FormData()
        data.append("user_id", user_id)
        data.append("new_first_name", firstName)
        data.append("new_last_name", lastName)

        if (firstName !== "" || lastName !== "") {
            let response = await axios.post(pages.base_url + "update-account.php", data)
            localStorage.setItem("userData", JSON.stringify(response.data))
            window.location.href = "classrooms.html"
        }
    });
}

pages.page_assignment = () => {
    const form = document.querySelector("form")
    const inputFile = document.getElementById("file-input")
    const image = document.querySelector(".file-image img")

    let base64 = ""

    inputFile.addEventListener("input", (e) => {
        if (e.target.files.length > 0) {
            function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            }
            getBase64(e.target.files[0]).then((data) => {
                image.src = data;
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                base64 = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    })

    form.addEventListener("submit", async(e) => {
        e.preventDefault()
        const userID = JSON
            .parse(localStorage.getItem("userData"))
            .user_id
        const assignment_id = 4;

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        let turnInDate = `${month}-${day}-${hours}:${minutes}`;

        let data = formData()
        data.append('user_id', userID)
        data.append('turnin_date', turnInDate)
        data.append('assignment_id', assignment_id)
        data.append('solution_text', base64)

        try {
            await pages.postAPI(pages.base_url + "upload_solution.php", data)
        } catch (error) {
            console.log(error)
        }
    })
}