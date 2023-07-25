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
    console.log('sign in')

    const nextButton = document.querySelector(".next-button")
    const emailInput = document.getElementById("email")
    const error = document.querySelector(".error")
    console.log(nextButton)

    nextButton.addEventListener("click", async() => {
        console.log('clicked')
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
    console.log(formElement)
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
        const classCodeInput = document.getElementById('class-code');
        const joinButton = document.querySelector('.join-class-modal-header .join-class-button button');
      
        classCodeInput.addEventListener('input', function() {
          const inputValue = classCodeInput.value.trim();
          if (inputValue !== '') {
            joinButton.removeAttribute('disabled');
            joinButton.classList.add('active');
          } else {
            joinButton.setAttribute('disabled', 'disabled');
            joinButton.classList.remove('active');
          }
        });
        const button_join = document.getElementById('button_join')
        button_join.addEventListener('click', async() => {
            const class_code = document.querySelector('#class-code').value;
            try {
                const data = new FormData();
                data.append('class_code',class_code)
                let response = await pages.postAPI('http://localhost/ClassroomClone/back-end/class_code.php', data);
            } catch (error) {
                console.log(error);
            }
            location.reload()
        })
    
        
 


    const user_id = JSON
        .parse(localStorage.getItem("userData"))
        .user_id
    const data = new FormData();
    data.append("user_id", user_id);
// Function to fetch and display classes
const userRole = JSON.parse(localStorage.getItem("userData")).role_id;
let link = ""
if (userRole == 1){
    link = "/teacher_stream.html"
} else {
    link = "/student_stream.html"
}


const displayClasses = async (apiUrl) => {
    

    try {
        const user_id = JSON.parse(localStorage.getItem("userData")).user_id;
        const data = new FormData();
        data.append("user_id", user_id);

        const response = await pages.postAPI(apiUrl, data);
        const bottom_classrooms = document.querySelector(".bottom-classrooms");
        // console.log(response)
        if (Array.isArray(response.data)) {
        response.data.forEach((item) => {
            sidebarClasses.innerHTML += `
            <div class="class">
                <div>${item.class_name[0]}</div>
                    <div <a href="${link}?id=${item.class_id}" class="class-data">
                        <p class="class-name">
                        <a href="${link}?id=${item.class_id}"
                            ${item.class_name}
                        </p>
                        <p class="class-desc">${item.section}</p>
                    </div>
            </div>`;

            bottom_classrooms.innerHTML += `<a href="${link}?id=${item.class_id}" class="class-link"><div class="class">
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
        });} else {
            
            console.log("No data available in response.");
          }

        // checking for the user to set the button in the navbar
        const userRole = JSON.parse(localStorage.getItem("userData")).role_id;
        if (userRole === 1) {
            joinClassButton.classList.add("hide");
        } else {
            createClassButton.classList.add("hide");
        }
    } catch (error) {
        console.log("Error in loading classes:", error);
    }
};

// Call the function for teacher or student view

if (userRole == 1) {
    const teacherClassesUrl = pages.base_url + "teachers-classes.php";
    displayClasses(teacherClassesUrl);
} else {
    const studentClassesUrl = pages.base_url + "student-classes.php";
    displayClasses(studentClassesUrl);
}

// const classLinks = document.querySelectorAll(".class-link");
// classLinks.forEach((linkElement) => {
//     linkElement.addEventListener("click", (event) => {
//         event.preventDefault();
//         const href = linkElement.getAttribute("href");
//         window.location.href = href; 
//     });
// });



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
        console.log('fucntion entered')
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("userData"))
        const user_id = user.user_id
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
    const announcements = document.querySelector(".announcements")
    const firstStateAnnouncement = document.getElementById("first-state-announcement")
    const secondStateAnnoucnement = document.getElementById("second-state-announcement")
    const cancelButton = document.querySelector("#second-state-announcement .buttons .cancel-button")
    const postButton = document.querySelector(".post-button")
    const editor = document.querySelector("#editor p")

    //tabs
        
        const classwork = document.getElementById("classwork-tab")
        const peopleTab = document.getElementById("people-tab")

        classwork.addEventListener('click', () =>{
            window.location.href= `/teacher_classwork.html?id=${class_idParam}`   
        } )

        peopleTab.addEventListener('click', () =>{
            window.location.href= `/teacher_people.html?id=${class_idParam}`   
        } )

    const user = JSON.parse(localStorage.getItem("userData"))
        const user_idStorage = user.user_id
        const first_name = user.first_name
        const last_name = user.last_name
        console.log(first_name)
        console.log(last_name)

    //Get query Parameter
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);
    const class_idParam = queryParams.get('id');
    console.log(class_idParam);

     
    //Load announcements
    document.addEventListener('DOMContentLoaded', async function() {
        const data_class_id = new FormData();
        data_class_id.append("class_id", class_idParam);

        const class_url = pages.base_url + "fetch_announcement.php"
        const response = await pages.postAPI(class_url, data_class_id);

        response
            .data
            .map((item) => (announcements.innerHTML +=
        `<div class="announcement">
        <div class="announcement-top">
        <div>
            <div class="user-data">
                <div class="profile-pic"><img
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
                    alt="profile-picture"></div>
                <div>
                    <div class="name">${first_name} ${last_name}</div>
                    <!--<p class="date">02:32</p>-->
                </div>
            </div>
            <div>
                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>
        </div>
        <div class="announcement-content">
            ${item.description}
        </div>
    </div>
    <div class="announcement-comment">
        <div class="profile-pic"><img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
            alt="profile-picture"></div>
        <div class="comment-input"><input placeholder="Add class comment" type="text"></div>
        <div class="share-icon">
            <i class="fa-solid fa-share"></i>
        </div>
    </div>
    </div>`
            ));

    const classCode_url = pages.base_url + "get-class-info.php"   
    const response_classCode = await pages.postAPI(classCode_url,data_class_id)
    const class_code = response_classCode.data[0].class_code;
    document.getElementById("class_code").innerHTML = class_code;
    });

    
    // Add announcement functionality
    postButton.addEventListener("click",async () => {

        const description = document.querySelector("#editor p").innerHTML;
        const class_id = class_idParam;
        
        if(description != "<br>"){
            try {
                const data = new FormData();
                data.append("description",description);
                data.append("class_id",class_id);
                
                const classCode_url = pages.base_url + "add_announcement.php"   
                const response_classCode = await pages.postAPI(classCode_url,data)
                

                const class_url = pages.base_url + "fetch_announcement.php"
                const response = await pages.postAPI(class_url, data);
                console.log(response)

                response
                .data
                .map((item) => (announcements.innerHTML +=
        `<div class="announcement">
        <div class="announcement-top">
        <div>
            <div class="user-data">
                <div class="profile-pic"><img
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
                    alt="profile-picture"></div>
                <div>
                    <div class="name">${first_name} ${last_name}</div>
                    <!--<p class="date">02:32</p>-->
                </div>
            </div>
            <div>
                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>
        </div>
        <div class="announcement-content">
            ${item.description}
        </div>
    </div>
    <div class="announcement-comment">
        <div class="profile-pic"><img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
            alt="profile-picture"></div>
        <div class="comment-input"><input placeholder="Add class comment" type="text"></div>
        <div class="share-icon">
            <i class="fa-solid fa-share"></i>
        </div>
    </div>
    </div>`

    
            ));
            secondStateAnnoucnement.classList.add("hide")
            firstStateAnnouncement.classList.remove("hide")
            annoucementInput.classList.remove("text-area")
            editor.innerHTML=""
            window.location.href= `/teacher_stream.html?id=${class_idParam}`
            } catch (error) {
                console.log(error);
            }

        }

    })

    //Create announcement functionality and design
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

   

    pages.page_forget_password = () => {

        const checkButton = document.getElementById("check-button")
        const favColorInput = document.getElementById("fav-color")

        checkButton.addEventListener('click', () => {
            pages.postAPI

        })
    }



};

                


pages.page_teacher_classwork = () => {

    //Get query Parameter
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);
    const class_idParam = queryParams.get('id');
    console.log(class_idParam);

    //tabs
        const streamTab = document.getElementById("stream-id")
        const peopleTab = document.getElementById("people-id")

        streamTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/teacher_stream.html?id=${class_idParam}`   
        } )

        peopleTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/teacher_people.html?id=${class_idParam}`   
        } )


    const createButton = document.getElementById("create-button")
    const dropDown = document.getElementById("drop-down")
    const topicModal = document.getElementById("topic-modal")
    const createTopicButton = document.getElementById("create-topic-button");
    const createAssignmentButton = document.getElementById("create-assignment-button")
    const boxTopicModal = document.getElementById("topic-box");
    const topicCancelButton = document.querySelector(".add-topic-modal .cancel-button");
    const assignmentModal = document.getElementById("modal-assignment");
    const closeAssignmentButton = document.getElementById("close-assignment");

    let classID = class_idParam;

    // close assignment
    closeAssignmentButton.addEventListener("click", (e) => {
        assignmentModal
            .classList
            .add("hide")
    })

    // open assignment
    createAssignmentButton.addEventListener("click", (e) => {
        
        assignmentModal
            .classList
            .remove("hide")
    })

    createButton.addEventListener("click", (e) => {
        
        if (!dropDown.contains(e.target)) {
            dropDown
                .classList
                .remove("hide");
        }
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
        topicModal
            .classList
            .add("hide")
    })

    //add topic
    
    const add_topic = document.getElementById('add_button');
    add_topic.addEventListener('click', async() => {
        const topic_name = document.querySelector('#topic').value;
        const class_id = class_idParam;
        console.log(topic_name)

        try {
            const data = new FormData();
            data.append('topic_name' , topic_name);
            data.append('class_id' , class_id);
            let response = await pages.postAPI('http://localhost/ClassroomClone/back-end/save-topic.php', data);
            topicModal.classList.add("hide")
        } catch (error) {
            console.log(error);
        }
    })


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
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropDownClasses = document.getElementById("dropdownMenu")
    const userId = JSON
        .parse(localStorage.getItem("userData"))
        .user_id

    const checkboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');

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

    dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();

        const checkboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');

        let checkedValues = [];
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
    let dueDate = dateInput.value;	
    const currentDate = new Date();	
    const month = currentDate.getMonth() + 1;	
    const day = currentDate.getDate();	
    const hours = currentDate.getHours();	
    const minutes = currentDate.getMinutes();	
    const seconds = currentDate.getSeconds();	
    let date = `${month}-${day}-${hours}:${minutes}:${seconds}`;	
    assignButton.addEventListener("click", async() => {	
        try {	
            for (let i = 0; i < checkedValues.length; i++) {	
                let data = new FormData();	
                const currentDate = new Date();	
                const month = currentDate.getMonth() + 1;	
                const day = currentDate.getDate();	
                const hours = currentDate.getHours();	
                const minutes = currentDate.getMinutes();	
                let date = `${month}-${day}-${hours}:${minutes}`;	
                data.append("launch_date", date);	
                data.append("title", assignmentTitleInput.value);	
                if (instructionsInput.innerHTML != "<br>") {	
                    data.append("instructions", instructionsInput.innerHTML);	
                }	
                dueDate === ""	
                    ? (dueDate = "No due date")	
                    : (dueDate = dueDate);	
                data.append("user_id", JSON.parse(localStorage.getItem("userData")).user_id);	
                data.append("class_id", checkedValues[i])	
                data.append("due_date", dueDate)	
                let response = await pages.postAPI(pages.base_url + "create-assignment.php", data);	
                console.log(response.data)	
            }	
        } catch (error) {	
            console.log(error)	
        }	
    })	

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

pages.page_teacher_people=async()=>{

     //Get query Parameter
     const queryParamsString = window.location.search;
     const queryParams = new URLSearchParams(queryParamsString);
     const class_idParam = queryParams.get('id');
     console.log(class_idParam);

        //tabs
        const streamTab = document.getElementById("stream-id")
        const classworkTab = document.getElementById("classwork-id")
        console.log(classworkTab);

        streamTab.addEventListener('click', () =>{
            window.location.href= `/teacher_stream.html?id=${class_idParam}`   
        } )

        classworkTab.addEventListener('click', () =>{
            window.location.href= `/teacher_classwork.html?id=${class_idParam}`
        console.log('clicked');

        } )
    
    const user_id = JSON
    .parse(localStorage.getItem("userData"))
    .user_id

      
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("class_id",class_idParam);
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
    data_s.append("class_id",class_idParam);
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

    //Get query Parameter
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);
    const class_idParam = queryParams.get('id');
    console.log(class_idParam);

    //tabs
        const streamTab = document.getElementById("stream-id")
        const classworkTab = document.getElementById("classwork-id")

        streamTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/student_stream.html?id=${class_idParam}`   
        } )

        classworkTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/student_classwork.html?id=${class_idParam}`   
        } )


    const user_id = JSON
    .parse(localStorage.getItem("userData"))
    .user_id

    const class_id=class_idParam    
    const data = new FormData();
    // data.append("user_id", user_id);
    data.append("class_id",class_id);
    let teacher_info=document.getElementById('teach')
    const response = await pages.postAPI(pages.base_url + "get-teacher-in-student-people.php", data);
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

    //get students in Student people tab
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

    //Get query Parameter
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);
    const class_idParam = queryParams.get('id');
    console.log(class_idParam);

    //tabs
        const classworkTab = document.getElementById("classwork-id")
        const peopleTab = document.getElementById("people-id")

        classworkTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/student_classwork.html?id=${class_idParam}`   
        } )

        peopleTab.addEventListener('click', () =>{
            console.log('clicked')
            window.location.href= `/student_people.html?id=${class_idParam}`   
        } )
   
    // add Google meet link
    btn_join=document.getElementById('btnJoin')
    const data = new FormData();    
    data.append("class_id",class_idParam);    
    const response = await pages.postAPI(pages.base_url + "get-google-meet-link.php", data);
    console.log(response.data)
    let link=response.data[0]
    console.log("link :",link)
    btn_join.addEventListener('click',()=>{
        window.open(link)
    })
           
    const data_announcements = new FormData();
    data.append("user_id", user.user_id)
    console.log(user.user_id)
    data.append("class_id",class_idParam);
    const classroom_url = pages.base_url + "return_ass_ann.php"
    const response_announcements = await pages.postAPI(classroom_url, data_announcements);
    console.log(response.data)
    const assignment = document.querySelector(".announcements")
   
    response_announcements.data.map((item) => (assignment.innerHTML += `   
    <div class="announcement">
    <div class="announcement-top">
        <div>
            <div class="user-data">
                <div class="profile-pic"><img
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
                    alt="profile-picture"></div>
                <div>
                    <div class="name">${item.title}</div>
                    <p class="date">${item.due_date}</p>
                </div>
            </div>
            <div>
                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>
        </div>
        <div class="announcement-content">
                ${item.instructions}
        </div>
    </div>     

  `))
}


pages.page_student_classwork = async () =>{

    //Get query Parameter
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);
    const class_idParam = queryParams.get('id');
    
    const class_id=class_idParam 
    console.log('class ID' + class_id);
    const topic=document.getElementById('topic_name');
    console.log(topic)        
    const data = new FormData();    
    data.append("class_id",class_id);    
    const response = await pages.postAPI(pages.base_url + "get-topics.php", data);
    console.log(response.data)  
    let topics=[]
    response.data.forEach(item => {
        console.log(item.topic_name);
        topics.push(item.topic_name)
      });
    console.log(topics)
    for(i=0;i<topics.length;i++){
       topic.innerHTML+="<p>"+topics[i]+"</p>";
    }
    
    
    
    const response_ass = await pages.postAPI(pages.base_url + "classwork-ass-topic-student.php", data);
    console.log(response_ass.data)
    const link ="/assignment.html"
    
    const assignments = response_ass.data;
    console.log("this" + response_ass.data)
    
    const topic_ass = document.getElementById("topic-ass");
    
    for (const topic in assignments) {         
    topic_ass.innerHTML+=`<div class="topic-header">
    <div class="topic-name" style="color: black;">${topic}</div>
    <div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
    </div>`;   
    
    // Loop through each assignment under the current topic
    for (const assignment of assignments[topic]) {
    // assignment.title
    // assignment.instructions;
    // assignment.due_date
    console.log(assignment.assignment_id)        
    
    topic_ass.innerHTML+=`<a href="${link}?id=${assignment.assignment_id}">
                            <div class="assignments">
                                <div   class="assignment">
                        
                                    <div  class="assignment-data">
                            
                                <div style="background-color: #ccc;">
                                    <i class="fa-regular fa-rectangle-list fa-lg"></i>
                                </div>
                                <div class="assignment-name">${assignment.title}</div>
                            </div>
                            <div class="date">Due ${assignment.due_date}</div>
                        </div>
                    </div>`;
                    }
    //tabs
    const streamTab = document.getElementById("stream-id")
    const peopleTab = document.getElementById("people-id")
    
    streamTab.addEventListener('click', () =>{
    console.log('clicked')
    window.location.href= `/student_stream.html?id=${class_idParam}`   
    } )
    
    peopleTab.addEventListener('click', () =>{
    console.log('clicked')
    window.location.href= `/student_people.html?id=${class_idParam}`   
       } )
    
    }

    //tabs
   const streamTab = document.getElementById("stream-id")
   const peopleTab = document.getElementById("people-id")

   streamTab.addEventListener('click', () =>{
       console.log('clicked')
       window.location.href= `/student_stream.html?id=${class_idParam}`   
   } )

   peopleTab.addEventListener('click', () =>{
       console.log('clicked')
       window.location.href= `/student_people.html?id=${class_idParam}`   
   } )


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
        const assignment_id = 2;

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        let turnInDate = `${month}-${day}-${hours}:${minutes}`;

        let data = new FormData()
        data.append('user_id', userID)
        data.append('turnin_date', turnInDate)
        data.append('assignment_id', assignment_id)
        data.append('solution_text', base64)

        try {
            let response = await pages.postAPI(pages.base_url + "upload_solution.php", data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    })
}
