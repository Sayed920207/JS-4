var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var tableInput = document.getElementById("table");
var visitButton = document.getElementById("visitButton");
var inputData = [];

if (localStorage.getItem("website")) {
  inputData = JSON.parse(localStorage.getItem("website"));
  appearance();
}

function add() {
  var input = {
    name: siteName.value,
    url: siteURL.value,
  };
  inputData.push(input);
  localStorage.setItem("website", JSON.stringify(inputData));
  appearance();
  clear();
}

function appearance() {
  var cartoona = '';
  for (var i = 0; i < inputData.length; i++) {
    cartoona += `
      <tr>
        <td>${i}</td>
        <td class="p-1 fw-bold">${inputData[i].name}</td>
        <td class="fw-bold">
          <button class=" bg-success text-white fw-bold border-success shadow-none fs-5 p-1  mb-3" onclick="visit(${i})">
            <i class="fa-solid fa-link me-2"></i> Visit
          </button>
        </td>
        <td class="fw-bold">
          <button class="btn text-brown text-white  fs-5 px-2 mb-3" onclick="del(${i})">
            <i class="fa-solid fa-trash-can me-3"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tableInput.innerHTML = cartoona;
}

function clear() {
  siteName.value = "";
  siteURL.value = "";
}

function del(index) {
  inputData.splice(index, 1);
  localStorage.setItem("website", JSON.stringify(inputData));
  appearance();
}

function visit(index) {
  window.open(inputData[index].url, '_blank');
}

function validateForm(element) {
  var regex = {
    siteName: /^[A-Z]\w{3,10}\s?\w{0,10}$/,
    siteURL: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,  
  };

  

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
