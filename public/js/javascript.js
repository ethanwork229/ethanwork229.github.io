const contactForm = document.querySelector(".featured-resource-form");

let username = document.getElementById("username");
let subject = document.getElementById("subject");

let email = document.getElementById("email");
let message = document.getElementById("message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    username: username.value,
    subject: subject.value,
    email: email.value,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/contact");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText," responses: ", xhr.response);

    

    // if (xhr.response == "success") {
      // alert("Email sent");
      username.value = "";
      subject.value = "";
      email.value = "";
      message.value = "";
    // } 
  };

  xhr.send(JSON.stringify(formData))

});
