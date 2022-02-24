var flagFirstTime = true;
var data;

//fetching the data from the API
async function showData() {
  var flagEditDelete = 0;
  // fetching data from API only one time
  if (flagFirstTime) {
    let response = fetch("https://jsonplaceholder.typicode.com/todos");
    data = response.json();
    console.log(data);
    flagFirstTime = false;
  }

  if (data.length > 0) {
    var temp = "";
    data.forEach((itemData) => {
      flagEditDelete++;

      temp += "<tr id = '" + flagEditDelete + "'>";
      temp +=
        "<th scope='row' contenteditable='false'>" + itemData.id + "</th>";
      temp +=
        "<td id = 'userId" + flagEditDelete + "'>" + itemData.userId + "</td>";
      temp +=
        "<td id = 'title" + flagEditDelete + "'>" + itemData.title + "</td>";
      temp +=
        "<td id='completed" +
        flagEditDelete +
        "'>" +
        itemData.completed +
        "</td>";
      temp +=
        "<td><button type='button' class='btn btn-primary' id = 'edit' onClick = 'edit(" +
        flagEditDelete +
        ")'>Edit</button><button type='button' class='btn btn-danger id = 'delete' onClick = 'deleteRow(" +
        flagEditDelete +
        ")'>Delete</button><button type='button' class='btn btn-success'onClick = 'save(" +
        flagEditDelete +
        ")'>Save</button></td></tr>";
    });
    document.getElementById("data").innerHTML = temp;
  }
}
showData();

// editing the data
function edit(tableRowId) {
  document.getElementById(tableRowId).setAttribute("contenteditable", "true");
}

// saving the edited data
function save(tableRowId) {
  let tbl = document
    .getElementById("userData")
    .getElementsByTagName("tbody")[0];
  document.getElementById(tableRowId).setAttribute("contenteditable", "false");
  data[tableRowId - 1].userId = tbl.rows[tableRowId - 1].cells[1].innerHTML;
  data[tableRowId - 1].title = tbl.rows[tableRowId - 1].cells[2].innerHTML;
  data[tableRowId - 1].completed = tbl.rows[tableRowId - 1].cells[3].innerHTML;
}

// deleting a row
function deleteRow(tableRowId) {
  document.getElementById(tableRowId).remove();
  console.log(data[tableRowId - 1]);
  delete data[tableRowId - 1];
  console.log(data);
}

// saving the newly entered data
function saveData() {
  var counter = data.length + 1;
  var obj = {
    userId: document.getElementById("userId").value,
    id: counter,
    title: document.getElementById("title").value,
    completed: document.getElementById("completedStatus").value,
  };
  document.getElementById("newUser").reset();
  data.push(obj);
  showData();
}
