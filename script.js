const inputForm = document.getElementById('input-form');
const addButton = inputForm.elements['add'];
const productInput = inputForm.elements['product'];
const groceryTable = document.querySelector('#grocery-list-table');


addButton.addEventListener("click", function() {
    const emptyTableRow = document.getElementById("empty-table-row");
    if (emptyTableRow !== null) {
      const parentTable = emptyTableRow.parentNode;
      parentTable.removeChild(emptyTableRow);
    }
    
    const productName = productInput.value;

    for (let i = 1; i < groceryTable.rows.length; i++) {
        const currentRow = groceryTable.rows[i];
        if (currentRow.cells[0].innerText === productName) {
          currentRow.cells[1].innerText 
              = parseInt(currentRow.cells[1].innerText) + 1;
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
    c3.innerText = "";

    // Append cells to row
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    
    // Append row to table body
    groceryTable.appendChild(row)
  });