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

    signup.addEventListener("click", async () => {
        const first_name = document.getElementById("").value;
        const last_name = document.getElementById("").value;
        const email = document.getElementById("").value;
        const password = document.getElementById("").value;
        const question = document.getElementById("").value;
        const answer = document.getElementById("").value;
          
        try {
          const data = new FormData();
          data.append("first_name", first_name)
          data.append("last_name", last_name)
          data.append("email", email)
          data.append("password", password)
          data.append("question", password)
          data.append("answer", password)
      
          const index_url = pages.base_url + "" 
          const response = await pages.postAPI(index_url, data)
          console.log(response)
        //   fetch("http://localhost/Login-Register/signup.php", {
        //     method: "POST",
        //     body: data
        //   })
        } catch (error) {
          console.log(error)
        }
      }) 

    const showPasswordCheckBox = document.getElementById("show-password-input")
    
    showPasswordCheckBox.addEventListener('change', function () {
        if(showPasswordCheckBox.checked){
            password_in.type = 'text';
        } else {
            password_in.type = 'password';
        }
    });

    const login = document.getElementById("login")

    login.addEventListener("click" , () =>{
        const email_in = document.getElementById("email_in").value 
        const password_in = document.getElementById("password_in").value 
        const data = {
            email : email_in,
            password : password_in
        }
        
    });
    
    pages.getAPI = async(url) => {
            try{
                const response = await axios.post('' , {
                    email_in : email_in,
                    password_in : password_in
            });

            } catch (error) {
            console.error('Login error : ' + error);
            }
        }
}