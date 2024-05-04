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

   //Iterate over a collection of elements (incrementing quantity for products in the product table)
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

//https://stackoverflow.com/questions/21379605/printing-div-content-with-css-applied
function printGroceryList() {
  let printWindow = window.open('', 'new div', 'height=400,width=600');
  printWindow.document.write('<html><head><title></title>');
  printWindow.document.write('<link rel="stylesheet" href="style.css" type="text/css" />');
  printWindow.document.write('</head><body >');
  printWindow.document.write(document.getElementById('grocery-list-section').innerHTML);
  printWindow.document.write('</body></html>');

  const printGroceryTable = printWindow.document.getElementById('grocery-list-table');
  for (let i = 0; i < printGroceryTable.rows.length; i++) {
    const currentRow = printGroceryTable.rows[i];
    if (currentRow.cells.length === 3) {
      // Modify the style of an element in response to user interactions using the style properties
      // Hide third column ('Remove') in print window
      currentRow.cells[2].style = "display: none;";
    }

    if (currentRow.cells.length === 1) {
      // Modify the style of an element in response to user interactions using the style properties
      // Hide last row (if displayed) in print window
      currentRow.style = "display: none;";
    }
  }

  printWindow.document.close();
  printWindow.focus();

  return true;
}

const printButton = document.getElementById('printButton');
printButton.addEventListener("click", function (e) {
  printGroceryList();
});

