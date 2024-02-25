document.addEventListener("mousemove", resetTimeOut);
document.addEventListener("keypress", resetTimeOut);

var result, userdetails, saveIndex;
var table = document.getElementById("tablelist");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    userdetails = users;
    
    doDisplay(users);
    
  });

  function doDisplay(users){
    let userlists = document.getElementById("listusers");
        let data = "";
    for (let i = 0; i < users.length; i++) {
      data += `
        <tr>
            <td>${i + 1}</td>
            <td>${users[i].name}</td>
            <td>${users[i].email}</td>
            <td>${users[i].address.city}</td>
            <td><button onclick="doEdit(${i})">Edit</button>&nbsp;<button onclick="doDelete(${i})">Delete</button></td>
            </tr>
        `;
    }

    userlists.innerHTML = data;
    }

function doEdit(index) {
  saveIndex = index;
  document.getElementById("editFormDis").style.display = "block";
  document.getElementById("editname").value = userdetails[index].name;
  document.getElementById("editemail").value = userdetails[index].email;
  document.getElementById("editcity").value = userdetails[index].address.city;
    resetTimeOut(); 
    console.log(userdetails) 
    
}

async function doDelete(index) {
  saveIndex = index;
  userdetails.splice(index, 1);
  console.log(userdetails);
  await toastMsg("User deleted!");
  doDisplay(userdetails)
}

function toastMsg(value){
    alert(value)
}

function closeEForm() {
  document.getElementById("editFormDis").style.display = "none";
  document.getElementById("eForm").reset();
}

function closeNForm() {
  document.getElementById("newUserFormDis").style.display = "none";
  document.getElementById("nForm").reset();
}

function addUser() {
  document.getElementById("newUserFormDis").style.display = "block";
  resetTimeOut();
}

function doSubmit(event, name, email, city) {
    event.preventDefault();
    var newUser = {"name": name, "email": email, "address": {"city": city}};
    // newUser.name = name;
    // newUser.email = email;
    // newUser.address = {"city": city};
    // console.log(newUser)
    userdetails.push(...newUser)

//   if (name.length && email.length && city.length != 0) {
//     alert("New user added!");
//   }
console.log(userdetails)
    doDisplay(userdetails)
    resetTimeOut()
    
 
  }

function doEditVal(event, edname, edemail, edcity) {
    event.preventDefault();
    
  userdetails[saveIndex].name = edname;
  userdetails[saveIndex].email = edemail;
  userdetails[saveIndex].address.city = edcity;
//   if (edname.length && edemail.length && edcity.length != 0) {
//     alert("User details edited!");
//   }
    closeEForm();
  doDisplay(userdetails)
  resetTimeOut();
  
 
}

function inactive() {
    closeEForm();
    closeNForm();
// document.getElementById("editFormDis").style.display = "none";
// document.getElementById("newUserFormDis").style.display = "none";
}

function resetTimeOut() {
    clearTimeout(inactivity)
     inactivity = setTimeout(inactive, 6000);


//  
  
}

