const pages = {}

pages.base_url = "Add Base URL here";

// Common Functions
pages.print_message = (message) =>{
    console.log(message);
}

pages.getAPI = async (url) =>{
    try{
        return await axios(url)
    }catch(error){
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data
        );
    }catch(error){
        pages.print_message("Error from Linking (POST)" + error)
    }
}

pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}

//html Pages
pages.page_index = () => {
    const createActBtn = document.getElementById("create-account-btn")
    console.log(createActBtn)
    createActBtn.addEventListener("click", () =>{
        window.location.href = "signup.html"
    })

    // const signup = 

    // signup.addEventListener("click", async () => {
    //     const first_name = document.getElementById("first_name").value;
    //     const last_name = document.getElementById("last_name").value;
    //     const email = document.getElementById("email").value;
    //     const password = document.getElementById("password").value;
    //     const answer = document.getElementById("answer").value;
          
    //     try {
    //       const data = new FormData();
    //       data.append("first_name", first_name)
    //       data.append("last_name", last_name)
    //       data.append("email", email)
    //       data.append("password", password)
    //       data.append("question", password)
    //       data.append("answer", password)
      
    //       const index_url = pages.base_url + "" 
    //       const response = await pages.postAPI(index_url, data)
    //       console.log(response)
    //     //   fetch("http://localhost/Login-Register/signup.php", {
    //     //     method: "POST",
    //     //     body: data
    //     //   })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }) 
    

    const showPasswordCheckBox = document.getElementById("show-password-input")
    
    showPasswordCheckBox.addEventListener('change', function () {
        if(showPasswordCheckBox.checked){
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
pages.page_classrooms = () => {
    console.log("we are in page classrooms.html");
    const profileBtn = document.getElementById("profile-pic") 
    const manage_profile=document.getElementById("profile-manage");   
    profileBtn.addEventListener("click", () =>{
        console.log("Click profile successful");
        manage_profile.style.visibility="visible";

    })
    // window.location.href = "signup.html"
}

