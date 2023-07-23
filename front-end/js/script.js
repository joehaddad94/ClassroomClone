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
pages.puttAPI = async(api_url, api_data) => {
    try {
        return await axios.put(api_url, api_data);
    } catch (error) {
        pages.print_message("Error from Linking (PUT)" + error)
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
                window.location.href = "/classrooms.html"
            }
        } catch (error) {
            console.error('Login error : ', error);
        }
    }
)}
 

pages.page_signup = () => {
    console.log('hello')
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
        } catch (error) {
            console.log(error);
        }
    });
}

pages.page_classrooms = () => {
    const burgerIcon = document.getElementById("burgerIcon");
    const sidebar = document.getElementById("sidebar");
    const sidebarClasses = document.querySelector(".sidebar .classes")

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
        const profileBtn = document.getElementById("profile-pic") 
        const manage_profile=document.getElementById("profile-manage");   
        profileBtn.addEventListener("click", () =>{
            console.log("Click profile successful");            
            if (manage_profile.style.display !== "none") {
                manage_profile.style.display = "none";
              } else {
                manage_profile.style.display = "block";
              }    
        })
        const user_id = JSON
        .parse(localStorage.getItem("userData"))
        .user_id
    const data = new FormData();
    data.append("user_id", user_id);

    try {
        let getClasses = async() => {
            let response = await pages.postAPI(pages.base_url + "teachers-classes.php", data);
            console.log(response.data)
            response.data.map((item) => (
                sidebarClasses.innerHTML += `<div class="class">
                        <div>${item.class_name[0]}</div>
                        <div class="class-data">
                            <p class="class-name">
                                ${item.class_name}
                            </p>
                            <p class="class-desc">${item.section}</p>
                        </div>
                    </div>`
            ))
        }
        getClasses()
        // console.log("classes " + classes)
        // sidebarClasses.innerHTML += `<div class="class">
        //                 <div>F</div>
        //                 <div class="class-data">
        //                     <p class="class-name">
        //                         FSW 23&24 | Soft Skills
        //                     </p>
        //                     <p class="class-desc">Full Stack Web Development Bootcamp from here</p>
        //                 </div>
        //             </div>`;
    } catch (error) {
        console.log(error + " in loading classes")
    }

    // const getClasses = async() => {     const response = await
    // pages.getAPI(pages.base_url + "teachers-classes.php", data)
    // console.log(response) } getClasses()
};
        

pages.page_manage=()=>{
    btnUpdate=document.getElementById('update')
    new_first_name=document.getElementById("first-name")
    new_last_name=document.getElementById("last-name")
    btnUpdate.addEventListener("click",()=>{

    btnUpdate.addEventListener("click",async()=>{
        console.log("editing  your info will occur here")
        console.log(new_first_name.value)
        console.log(new_last_name.value)
        new_first_name=document.getElementById("first-name").value
        new_last_name=document.getElementById("last-name").value
        user_id=JSON.parse(localStorage.getItem("userData")).user_id
        console.log(user_id)

        console.log(new_first_name)
        console.log(new_last_name)

        const data = new FormData();
        data.append("new_first_name", new_first_name);
        data.append("new_last_name", new_last_name);
        data.append("user_id", user_id);        
        console.log(data)
        const manage_url = pages.base_url + "update-account.php"
        const response = await pages.puttAPI(manage_url, data)
        console.log(response)
        console.log(response.data.success)  
        console.log(response.data.message) 
        new_fname=response.data.new_fname
        new_lname=resonse.data.new_lname
        console.log("updated ",new_fname," ",new_lname)      

    })}


    )}

pages.page_forget_password = () => {

    const checkButton = document.getElementById("check-button")
    const favColorInput = document.getElementById("fav-color")

    checkButton.addEventListener('click', () => {
        pages.postAPI
    })
}