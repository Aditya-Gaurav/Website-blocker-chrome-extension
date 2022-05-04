const webForm = document.getElementById("webBlockerForm");
const d = new Date();
let year = d.getFullYear();
document.getElementById("demo").innerHTML = year;
document.getElementById("addBtn").addEventListener("click", getWeb);


const webName = document.getElementById("getWebName");
let validWebName = false;
webName.addEventListener("blur", () => {
  let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  let input = webName.value;
  if (regex.test(input)) {
    webName.classList.remove('is-invalid');
    webName.classList.add('is-valid');

    validWebName = true;

  } else {
    webName.classList.add('is-invalid');
    webName.classList.remove('is-valid');

    validWebName = false;


  }
})

function resetForm() {
  document.getElementById("webBlockerForm").reset();
}

function validateForm(input) {
  console.log(input)
  var submitBtn = document.getElementById("addBtn");
  if (input.value != '') {
    submitBtn.disabled = false;
    console.log("false")
  } else {
    submitBtn.disabled = true;
    console.log("true4")


  }
}

function addW(input) {
  var blockedSite = [];

  console.log(input);
  let tableRef = document.getElementById('webList');
  let newRow = tableRef.insertRow(-1);

  let newCell1 = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);


  let newText = document.createTextNode(input);
  //   let newText2 = document.createTextNode('<i class="fa fa-trash"></i>');
  let newText2 = document.createElement("i");
  newText2.classList.add("fa", 'fa-trash');
  newText2.setAttribute("onclick", "deleteWeb(this)");
  let id = `web-${Math.floor(Math.random() * 100)}`;
  newText2.style.cursor = "pointer";
  newText2.setAttribute("id", id);

  console.log(id);
  // inputValue.value = '';

  newCell1.appendChild(newText);

  newCell2.appendChild(newText2);
  // chrome.storage.sync.set({"url": input}, function() {
  //   console.log('Value is set to ' + input);
  // });
   chrome.storage.sync.get(['blockedSites'], function (result) {
    console.log('Value currently is ' + JSON.stringify(result.blockedSites));
    result.blockedSites = result.blockedSites ? result.blockedSites : [];
    result.blockedSites.push(input);
    let unique = [...new Set(result.blockedSites)];

    chrome.storage.sync.set({ blockedSites: unique }, function () {
      console.log('Value is set to ' + unique);
      detectTableRow();
      resetForm();
      chrome.storage.sync.get(function (result) { console.log(result) })

    });
  })
  // if(input != '') {
  //   blockedSite.push(input);
  //   console.log("input", input, "blockedSite", result.blockedSites)
  //   chrome.storage.sync.set({ blockedSites: result.blockedSites }, function () {
  //     console.log('Value is set to ' + result.blockedSites);
  //   });
  // }




 
}


function getWeb() {
  // check el  input value  regular expresion [. : / alphanumeric noWhitespace]
  // get el   
  // pass el
  let inputValue = document.getElementById('getWebName').value;
  console.log("form.checkValidity()", webForm.checkValidity())
  if (!!inputValue) {
    addW(inputValue);

  }
}

function deleteWeb(t) {
  var row = t.parentNode.parentNode;
  console.log(row.rowIndex);

  document.getElementById("listTable").deleteRow(row.rowIndex);
  detectTableRow();

}



function detectTableRow() {
  const tableLength = document.getElementById("listTable").rows.length;
  console.log("tableLength", tableLength);
  let el = document.getElementById("noListExit");

  if (tableLength === 1) {
    el.style.display = "block";
  } else {
    el.style.display = "none";

  }
  // let el = document.getElementById("noListExit");
  // el.style.display = "none";
}











// chrome.runtime.onMessage.addListner(gotMessage);

// function gotMessage(message, sender, sendResponse) {
//   console.log(message.txt)
//   if(message.txt === "hello") {
//     let para = document.getElementsByTagName('p');
//     for(elt of para) {
//       elt.style['background-color'] = '#FF0FF'
//     }
//   }

async function fetchTableData() {
  await chrome.storage.sync.get(['blockedSites'], function (result) {
    console.log('Value currently is ' + JSON.stringify(result.blockedSites));
    console.log("adsddd", typeof (result.blockedSites));
    if(result.blockedSites) {
      // blockedSitesArray = result.blockedSites.slice();
      // console.log({ blockedSitesArray });
      for (blockedSite of result.blockedSites) {
        console.log
        addW(blockedSite);
      }
    }
  });
}
fetchTableData();

