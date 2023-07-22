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

const signup = document.getElementById("signup");

signup.addEventListener("click", () => {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const answer = document.getElementById("answer").value;

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
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
});
  


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
