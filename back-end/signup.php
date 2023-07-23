<?php
include('connection.php');


$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$answer = $_POST['answer'];
$role_id = $_POST['role_id'];


$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password,PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(first_name,last_name,email,password,answer,role_id) values(?,?,?,?,?,?)');
    $query->bind_param('sssssi', $first_name,$last_name,$email,$hashed_password,$answer,$role_id);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "another message in success";
} else {
    $response['status'] = "failed";
    $response['message'] = "another message in fail";
}


echo json_encode($response);


//  try {
//         let getClasses = async() => {
//             let response = await pages.postAPI(pages.base_url + "teachers-classes.php", data);
//             console.log(response.data)
//             response.data.map((item) => (
//                 sidebarClasses.innerHTML += `<div class="class">
//                         <div>${item.class_name[0]}</div>
//                         <div class="class-data">
//                             <p class="class-name">
//                                 ${item.class_name}
//                             </p>
//                             <p class="class-desc">${item.section}</p>
//                         </div>
//                     </div>`
//             ))
//         }
//         getClasses()
//         // console.log("classes " + classes)
//         // sidebarClasses.innerHTML += `<div class="class">
//         //                 <div>F</div>
//         //                 <div class="class-data">
//         //                     <p class="class-name">
//         //                         FSW 23&24 | Soft Skills
//         //                     </p>
//         //                     <p class="class-desc">Full Stack Web Development Bootcamp from here</p>
//         //                 </div>
//         //             </div>`;
//     } catch (error) {
//         console.log(error + " in loading classes")
//     }