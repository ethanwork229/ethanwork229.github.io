const contactForm = document.querySelector(".featured-resource-form");

let firstName = document.getElementById("firstName");
let radioStation = document.getElementById("radioStation");
let lastName = document.getElementById("lastName");

let email = document.getElementById("email");
let quantity = document.getElementById("quantity");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    radioStation: radioStation.value,
    quantity: quantity.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/featured-resource");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    
    

    
      alert("Email sent");
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      radioStation.value = "";
      quantity.value = "";
    
  };

  xhr.send(JSON.stringify(formData))

});
