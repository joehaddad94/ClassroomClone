
        if (firstName !== "" || lastName !== "") {
            let response = await axios.post(pages.base_url + "update-account.php", data)
            localStorage.setItem("userData", JSON.stringify(response.data))
            window.location.href = "classrooms.html"
        }
    });
}