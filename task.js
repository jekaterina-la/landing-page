let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let email = document.querySelector("#email");
let country = document.querySelector("#country");
let phone = document.querySelector("#phone");
let form = document.querySelector("#register");
let successPopup = document.querySelector("#successPopup");
let closePopup = document.querySelector("#btnClosePopup");
let dangerAlert = document.querySelector("#dangerAlert");
let passwordHelper = document.querySelector("#passwordHelper");
let confirmPasswordHelper = document.querySelector("#confirmPasswordHelper");
let table = document.querySelector("#userTable tbody");
let popUpContent = document.querySelector(".modal-body");

$("#formButton").click(function(){
    $("#register").toggle();
});   

closePopup.addEventListener("click",function(){
    successPopup.style.display = "none";
});

let newID = 1;

GenerateID();

document.addEventListener("DOMContentLoaded",getUsers);

table.addEventListener("click",removeRow);

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    if(checkEmptyFeild(firstName) && checkEmptyFeild(lastName) && checkEmptyFeild(password)
    && checkEmptyFeild(confirmPassword) && checkEmptyFeild(email) && checkEmptyFeild(country) && checkEmptyFeild(phone)
    ){
        if(!checkPasswordLength()){
            checkPasswordLength();
            return;
        }

        if(!checkConfirmPassword()){
            checkConfirmPassword();
            return;
        }

        registerNewUser(firstName,lastName,password,email,country,phone);
        var username = firstName.value;
        popUpContent.textContent = "Thanks! " + username + " successfully registered!";
        successPopup.style.display = "block";
        form.reset();

    }else{
        checkEmptyFeild(firstName);
        checkEmptyFeild(lastName);
        checkEmptyFeild(password);
        checkEmptyFeild(confirmPassword);
        checkEmptyFeild(email);
        checkEmptyFeild(country);
        checkEmptyFeild(phone);
    }
});

function checkEmptyFeild(feild){
    if(feild.value == ""){
        feild.classList.add("border","border-danger");
        dangerAlert.textContent = "All feilds must be not empty";
        dangerAlert.classList.add("d-block");
        return;
    }else{
        feild.classList.remove("border-danger");
        dangerAlert.classList.remove("d-block");
        return true;
    }
}

function checkPasswordLength(){
    if(password.value.length < 6){
        password.classList.add("border","border-warning");
        passwordHelper.textContent = "At least 6 characters";
        passwordHelper.classList.add("text-danger");
        return false;
    }else{
        password.classList.remove("border-warning");
        passwordHelper.textContent = "";
        return true;
    }
}

function checkConfirmPassword(){
    var autoCheckbox = document.getElementById("autocheckbox");
    if(confirmPassword.value != password.value){
        password.classList.add("border","border-warning");
        confirmPasswordHelper.textContent = "Must be the same";
        confirmPasswordHelper.classList.add("text-danger");
        autoCheckbox.style.visibility = "hidden";
        return false;
    }else{
        password.classList.remove("border-warning");
        confirmPasswordHelper.textContent = "";
        autoCheckbox.style.visibility = "visible";
        return true;
    }
}

function registerNewUser(firstName,lastName,password,email,country,phone){
    let user = `<tr>
    <td>${newID}</td>
    <td>${firstName.value}</td>
    <td>${lastName.value}</td>
    <td>${password.value}</td>
    <td>${email.value}</td>
    <td>${country.value}</td>
    <td>${phone.value}</td>
    <td><button class="btn btn-danger"><i class="fa fa-trash"></i>Remove</button></td>
    </tr>`;

    table.innerHTML += user;
    saveToLocalStorage(user);
}

function saveToLocalStorage(user){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = [];
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }
    usr.push(user);
    localStorage.setItem("user",JSON.stringify(usr));
}

function getUsers(){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = [];
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }

    usr.forEach(Element=>{
        table.innerHTML += Element;
    });
}

function GenerateID(){
    let usr;
    if(localStorage.getItem("user") === null){
        usr = [];
        newID = 1;
    }else{
        usr = JSON.parse(localStorage.getItem("user"));
    }   
    
    usr.forEach(function(users){
        newID = users.substring(8,users.indexOf('</td>'));
        newID++;
   });
}

function removeRow(event){
    if(event.target.classList[0] == "btn"){
        event.target.parentElement.parentElement.remove();
        removeUserFromList(event.target.parentElement.parentElement.firstChild.innerHTML)
    }
}

function removeUserFromList(user){
        let usr;
        if(localStorage.getItem("user") === null){
            usr = [];
        }else{
            usr = JSON.parse(localStorage.getItem("user"));
        }

        usr.forEach(function(users,index){
            if(users.substring(8,users.indexOf('</td>')) == user){
                usr.splice(index,1);
           }
        });
        localStorage.setItem("user",JSON.stringify(usr));
}
