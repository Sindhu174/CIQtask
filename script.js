document.addEventListener("mousemove", resetTimeOut);
document.addEventListener("keypress", resetTimeOut);

var result, userdetails, saveIndex;
var table = document.getElementById("tablelist");
async function getData(){
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    userdetails = users;
    doDisplay(users)
    } catch (error) {
    alert('Error fetching data:', error);
}
}


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
     
}

 function doDelete(index) {
  saveIndex = index;
  userdetails.splice(index, 1);
  alert(`User ${index+1} deleted!`);
  doDisplay(userdetails)
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
    userdetails.push({...newUser})
    closeNForm();
    alert(`User ${userdetails.length} added!`)
    doDisplay(userdetails)
    resetTimeOut();
    }

function doEditVal(event, edname, edemail, edcity) {
    event.preventDefault();    
    userdetails[saveIndex].name = edname;
    userdetails[saveIndex].email = edemail;
    userdetails[saveIndex].address.city = edcity;
    closeEForm();
    alert(`User ${saveIndex+1} edited!`);
    doDisplay(userdetails);
    resetTimeOut();
}

function inactive() {
    closeEForm();
    closeNForm();
}

function resetTimeOut() {
    clearTimeout(inactivity)
    var inactivity = setTimeout(inactive, 60000);
}

