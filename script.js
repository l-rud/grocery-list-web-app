const inputForm = document.getElementById('input-form');
const addButton = inputForm.elements['add'];
const productInput = inputForm.elements['product'];
const groceryTable = document.querySelector('#grocery-list-table');

productInput.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addButton.click();
  }
});

//event-based validation alert message
function alert(message) {
  const errorEl = document.getElementById("errorDisplay");
  errorEl.style.display = "block";
  errorEl.textContent = message;

  setTimeout(() => {
    errorEl.style.display = "none";
  }, 3000);
}

addButton.addEventListener("click", function (e) {
  const productName = productInput.value.trim();
  if (productName === "") {
    // event-based validation: do not allow product names containing whitespaces only
    alert("Product name should not be blank");
    return;
  }

  const emptyTableRow = document.getElementById("empty-table-row");
  if (emptyTableRow !== null) {
    const parentTable = emptyTableRow.parentNode;
    parentTable.removeChild(emptyTableRow);
  }

  for (let i = 1; i < groceryTable.rows.length; i++) {
    const currentRow = groceryTable.rows[i];
    if (currentRow.cells[0].innerText === productName) {
      currentRow.cells[1].innerText
        = parseInt(currentRow.cells[1].innerText) + 1;

        e.preventDefault();
        // Modify value attribute of input element in response to user interaction
        // (when the users clicks add button, product input field is cleared out)
        productInput.value = "";
        
        return;
    }
  }

  // Create row element
  const row = document.createElement("tr");

  // Create cells
  const c1 = document.createElement("td");
  const c2 = document.createElement("td");
  const c3 = document.createElement("td");

  // Insert data to cells
  c1.innerText = productName;
  c2.innerText = 1;
  const removeImage = document.createElement('img');
  removeImage.src = 'images/remove.svg';
  removeImage.addEventListener("click", function (event) {
    const target = event.target;
    const currentRow = target.parentElement.parentElement;
    currentRow.parentElement.removeChild(currentRow);
  });
  c3.appendChild(removeImage);

  // Append cells to row
  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);

  // Append row to table body
  groceryTable.appendChild(row);

  e.preventDefault();
  // Modify value attribute of input element in response to user interaction
  // (when the users clicks add button, product input field is cleared out)
  productInput.value = "";
});

  //Using the cloneNode method to create an additional <td> element (remove column) in the grocery table 
  const additionalTdTemplate = document.getElementById('tableDataTemplate');
  const additionalTdClone = tableDataTemplate.content.cloneNode(true);
  const tableRow = document.querySelector('tr');
  tableRow.appendChild(additionalTdClone);

