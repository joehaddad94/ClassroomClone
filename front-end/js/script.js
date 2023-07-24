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

    const showPasswordCheckBox = document.getElementById("show-password-input")

    showPasswordCheckBox.addEventListener('change', function () {
        if (showPasswordCheckBox.checked) {
            password_in.type = 'text';
        } else {
            password_in.type = 'password';
        }
    });

    const login = document.getElementById("login")

    login.addEventListener("click", async() => {
        const email = document
            .getElementById("email_in")
            .value
        const password = document
            .getElementById("password_in")
            .value
        const errorElement = document.querySelector(".error")

        const data = new FormData();
        data.append("email", email);
        data.append("password", password)

        try {
            let response = await pages.postAPI(pages.base_url + "signin.php", data);

            if (response.data.status === "user not found") {
                errorElement.innerText = "User not found"
                setTimeout(() => {
                    errorElement.innerText = ""
                }, 3000)
            } else if (response.data.status === "wrong password") {
                errorElement.innerText = "Wrong Password"
                setTimeout(() => {
                    errorElement.innerText = ""
                }, 3000)
            } else {
                const userObject = Object
                    .keys(response.data)
                    .reduce((acc, key) => {
                        if (key !== "status") {
                            acc[key] = response.data[key]
                        }
                        return acc
                    }, {})
                localStorage.setItem("userData", JSON.stringify(userObject))
                window.location.href = "classrooms.html"
            }
        } catch (error) {
            console.error('Login error : ', error);
        }
    })
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
    console.log("classroom page")

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
    const formElement = document.querySelector("form")

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
            
                    bottom_classrooms.innerHTML += `<a href="/classrooms?id=${item.class_id}"><div class="class">
                    <div class="top-class">
                        <div class="class-title">
                            <p>${item.class_name}</p>
                            <div>
                                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                            </div>
                        </div>
                        <p>${item.room}</p>
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

    // modal functionlity

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

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();

        const classname = classname_input.value;
        const section = section_input.value;
        const subject = subject_input.value;
        const room = room_input.value;

        let classData = new FormData();
        classData.append("class_name", classname);
        classData.append("section", section);
        classData.append("subject", subject);
        classData.append("room", room);
        classData.append("googlemeet_link", "");
        classData.append("user_id", user_id);

        try {
            const createClass = async() => {
                await pages.postAPI(pages.base_url + "create-class.php", classData);
                modal
                    .classList
                    .add("hide")
                window
                    .location
                    .reload()
            };
            createClass();
        } catch (error) {
            console.log(error);
        }
    });
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
        secondStateAnnoucnement.classList.add("hide")
        firstStateAnnouncement.classList.remove("hide")
        annoucementInput.classList.remove("text-area")
    })
    })

    pages.page_forget_password = () => {

        const checkButton = document.getElementById("check-button")
        const favColorInput = document.getElementById("fav-color")

        checkButton.addEventListener('click', () => {
            pages.postAPI

        })
    }

    pages.page_classrooms = async() => {
        const user = JSON.parse(localStorage.getItem("userData"))
        const user_id = user.user_id
        const data = new FormData();
        data.append("user_id", user_id)
        const classroom_url = pages.base_url + "teachers-classes.php"
        const response = await pages.postAPI(classroom_url, data);
        console.log(response.data)
        console.log(1)
        const bottom_classroom = document.querySelector(".bottom-classrooms")
        console.log(bottom_classroom)
        response
            .data
            .map((item) => (bottom_classroom.innerHTML += `         
        <div class="class">
        <div class="top-class">
          <div class="class-title">
            <p>${item.class_name}</p>
            <div>
              <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>
          </div>
          <p>Full Stack Web Development Bootcamp</p>
          <p>Tech Department</p>
          <div class="profile-pic">
            <img
              src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
              alt="Profile Picture"
            />
          </div>
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
      </div>
      `))

    }

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
    const createButton = document.getElementById("create-button")
    const dropDown = document.getElementById("drop-down")
    const topicModal = document.getElementById("topic-modal")
    const createTopicButton = document.getElementById("create-topic-button");
    const createAssignmentButton = document.getElementById("create-assignment-button")
    const boxTopicModal = document.getElementById("topic-box");
    const topicCancelButton = document.querySelector(".add-topic-modal .cancel-button");
    const assignmentModal = document.getElementById("modal-assignment");
    const closeAssignmentButton = document.getElementById("close-assignment")

    // close assignment
    closeAssignmentButton.addEventListener("click", (e) => {
        assignmentModal.classList.add("hide")
    })

    // open assignment
    createAssignmentButton.addEventListener("click", (e) => {
        assignmentModal.classList.remove("hide")
    })

    createButton.addEventListener("click", (e) => {
        if (!dropDown.contains(e.target)) {
            dropDown
                .classList
                .remove("hide");
        }
        console.log("bottom clicked")
    })

    document.addEventListener("click", (e) => {
        if (!createButton.contains(e.target) && !createButton.contains(e.target)) {
            dropDown
                .classList
                .add("hide")
        }
    })

    createTopicButton.addEventListener("click", (e) => {
        dropDown
            .classList
            .add("hide")
        topicModal
            .classList
            .remove("hide");
    });

    topicModal.addEventListener('click', (e) => {
        if (!boxTopicModal.contains(e.target)) {
            topicModal
                .classList
                .add("hide")
        }
    })

    topicCancelButton.addEventListener("click", (e) => {
        topicModal.classList.add("hide")
    })

}

pages.page_forget_password = () => {

    const checkButton = document.getElementById("check-button")
    const favColorInput = document.getElementById("fav-color")

    checkButton.addEventListener('click', () => {
        pages.postAPI
    })
}

pages.page_teacher_people=async()=>{
    // const user_id = JSON
    // .parse(localStorage.getItem("userData"))
    // .user_id

    const user_id=7
    const class_id=1     
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("class_id",class_id);
    let teacher_info=document.getElementById('teach')
    const response = await pages.postAPI(pages.base_url + "get-user-teacher-ofclass.php", data);
    console.log(response.data)
    datax=response.data
    var results = [];
    for (var i = 0, len = datax.length; i < len; i++)
    {
        var res = datax[i];
        results.push({
            'first_name':res.first_name,
            'last_name':res.last_name,
            
        });
        console.log(res)
        console.log(res.first_name+" "+res.last_name)
        teacher_info.innerHTML += '<div class="teacher-data">' +
        '<div class="profile-pic">' +
        '<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb" alt="profile picture">' +
        '</div>' +
        '<div class="teacher-name" id="tname">' + res.first_name +" "+res.last_name+ '</div>' +
        '</div>';
    }
    const data_s = new FormData();
    data_s.append("class_id",class_id);
    let student_info=document.getElementById('student')
    const response_s = await pages.postAPI(pages.base_url + "get-user-student-ofclass.php", data);
    console.log(response_s.data)
    const numRows = response_s.data.num_rows;
    console.log(numRows)
    const students_number=document.getElementById('nb-students')
    students_number.innerText=numRows+" students"
    const users = response_s.data;
for (let i = 0; i < numRows; i++) {
    const first_name = users[i].first_name;
    const last_name = users[i].last_name;
    console.log(first_name, last_name);    
    student_info.innerHTML += '<div class="student">' +
    '<div class="profile-pic">' +
    '<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb" alt="profile picture">' +
    '</div>' +
    '<div class="student-name">' + first_name +" "+last_name+ '</div>' +
    '</div>';
    } 
}



pages.page_student_people=async()=>{
    // const user_id = JSON
    // .parse(localStorage.getItem("userData"))
    // .user_id

    const user_id=7
    const class_id=1     
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("class_id",class_id);
    let teacher_info=document.getElementById('teach')
    const response = await pages.postAPI(pages.base_url + "get-user-teacher-ofclass.php", data);
    console.log(response.data)
    datax=response.data
    var results = [];
    for (var i = 0, len = datax.length; i < len; i++)
    {
        var res = datax[i];
        results.push({
            'first_name':res.first_name,
            'last_name':res.last_name,
            
        });
        console.log(res)
        console.log(res.first_name+" "+res.last_name)
        teacher_info.innerHTML += '<div class="teacher-data">' +
        '<div class="profile-pic">' +
        '<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb" alt="profile picture">' +
        '</div>' +
        '<div class="teacher-name" id="tname">' + res.first_name +" "+res.last_name+ '</div>' +
        '</div>';
    }
    const data_s = new FormData();
    data_s.append("class_id",class_id);
    let student_info=document.getElementById('student')
    const response_s = await pages.postAPI(pages.base_url + "get-user-student-ofclass.php", data);
    console.log(response_s.data)
    const numRows = response_s.data.num_rows;
    console.log(numRows)
    const students_number=document.getElementById('nb-students')
    students_number.innerText=numRows+" students"
    const users = response_s.data;
for (let i = 0; i < numRows; i++) {
    const first_name = users[i].first_name;
    const last_name = users[i].last_name;
    console.log(first_name, last_name);    
    student_info.innerHTML += '<div class="student">' +
    '<div class="profile-pic">' +
    '<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb" alt="profile picture">' +
    '</div>' +
    '<div class="student-name">' + first_name +" "+last_name+ '</div>' +
    '</div>';
    }  
}
pages.page_student_stream=async()=>{

    const class_id=1     
    btn_join=document.getElementById('btnJoin')
    const data = new FormData();    
    data.append("class_id",class_id);    
    const response = await pages.postAPI(pages.base_url + "get-google-meet-link.php", data);
    console.log(response.data)
    var link=response.data[0]
    console.log("link :",link)
    btn_join.addEventListener('click',()=>{
        window.open(link)
    })
}


