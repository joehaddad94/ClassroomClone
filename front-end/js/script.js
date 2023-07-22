const pages = {}

pages.base_url = "Add Base URL here";

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
    
    login.addEventListener("click" , async() =>{
        const email = document.getElementById("email_in").value 
        const password = document.getElementById("password_in").value 
        const data = {
            email ,
            password
        }

        try{
            const response = await axios.post('http://localhost/ClassroomClone/back-end/signin.php' , data);             
            console.log(response.data)
        } catch (error) {
            console.error('Login error : ' ,  error);
        }
    }
    )}

    login.addEventListener("click", () => {
        const email_in = document
            .getElementById("email_in")
            .value
        const password_in = document
            .getElementById("password_in")
            .value
        const data = {
            email: email_in,
            password: password_in
        }

    });

    pages.getAPI = async(url) => {
        try {
            const response = await axios.post('', {
                email_in: email_in,
                password_in: password_in
            });

        } catch (error) {
            console.error('Login error : ' + error);
        }
    }


pages.page_classrooms = () => {
    const burgerIcon = document.getElementById("burgerIcon");
    const sidebar = document.getElementById("sidebar");

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
};
