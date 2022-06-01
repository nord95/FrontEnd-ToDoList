import { showOrHideButtons, showOrHideRows, showPosition, showRows, hideRows } from './functions.js';
// Keeping count on how many items there are left unchecked, 
let itemsleft = 0;
// how many items are left unchecked&checked
let countTodos = 0;
//what location the user currently is at between showing all/only-unchecked/only-checkd 
let position = 0;
const form = document.querySelector('form');
const bottomTable = document.getElementById("bottomTable");
const rowNotChecked = document.getElementsByClassName("rowNotChecked");
const rowChecked = document.getElementsByClassName("rowChecked");
const markAll = document.getElementById('markAll');
const showAll = document.getElementById("showAll");
const showActive = document.getElementById("showActive");
const itemsLeft = document.getElementById("itemsLeft");
const showCompleted = document.getElementById('showCompleted');
const clearCompleted = document.getElementById("clearCompleted");

//event to create a new todo with a checkbox, a label, and a button
//each checkbox and button get its own event handler, referring to each todo.
form.onsubmit = event => {
    event.preventDefault();

    const inputTodo = form.elements.inputTodo.value.trimLeft().trimRight();
    if (inputTodo != "") {
        itemsleft++;
        countTodos++;

        bottomTable.style = "display:table-row";
        markAll.style = "display:table-row";
        itemsLeft.textContent = itemsleft + " items left";
        var table = document.getElementById('myTable');
        var rowNotChecked = table.insertRow(Math.floor(table.rows.length - 1));
        rowNotChecked.setAttribute("class", 'rowNotChecked');
        rowNotChecked.setAttribute("style", 'table-row');
        var cell1 = rowNotChecked.insertCell(0);
        var cell2 = rowNotChecked.insertCell(1);

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'checkbox';
        cell1.appendChild(checkBox);

        var input = document.createElement('label');
        input.textContent = inputTodo;
        cell2.appendChild(input);
        cell2.colSpan = 6;

        const removeButton = document.createElement('button');
        removeButton.setAttribute("class", 'buttonForRemove');
        removeButton.type = 'button';
        removeButton.textContent = '❌';
        cell2.appendChild(removeButton)

        showOrHideRows(position);
        form.elements.inputTodo.value = "";

        removeButton.onclick = event => {
            event.preventDefault();
            rowNotChecked.remove();
            countTodos--;

            if (!checkBox.checked) {
                itemsleft--;
                itemsLeft.textContent = itemsleft + " items left";
            }
            showOrHideButtons(countTodos);

            if (rowChecked.length < 1) {
                clearCompleted.style = "display:none";
            }
        };

        checkBox.onchange = event => {
            event.preventDefault();

            if (checkBox.checked) {
                //the unchecked todo/row gets checked and therefor gets a new attribute 
                // being checked (rowChecked)
                rowNotChecked.setAttribute("class", 'rowChecked');
                clearCompleted.style = "display:table-row";
                rowNotChecked.cells[1].firstChild.style.textDecorationLine = "line-through";
                rowNotChecked.cells[1].firstChild.style.opacity = "0.5";

                itemsleft--;
                itemsLeft.textContent = itemsleft + " items left";
                //if you are in the active position (2), the checked line is hidden
                if (position === 2) {
                    rowNotChecked.style = "display:none";
                }

            }
            else {
                //the checked todo gets unchecked and the row get a new attribute
                rowNotChecked.setAttribute("class", 'rowNotChecked');
                rowNotChecked.cells[1].firstChild.style.textDecorationLine = "none";
                rowNotChecked.cells[1].firstChild.style.opacity = "1";

                itemsleft++;
                itemsLeft.textContent = itemsleft + " items left";

                if (position === 3) {
                    rowNotChecked.style = "display:none";
                }

                if (countTodos - itemsleft === 0) {
                    clearCompleted.style = "display:none";
                }
                showOrHideButtons(countTodos);
            }
        }
    }
};
showAll.onclick = event => {
    event.preventDefault();
    position = 1;
    showPosition(position);
    showRows(".rowChecked");
    showRows(".rowNotChecked");
    showOrHideButtons(countTodos);
};
showActive.onclick = event => {
    event.preventDefault();

    position = 2;
    showPosition(position);
    hideRows(".rowChecked");
    showRows(".rowNotChecked");
    showOrHideButtons(countTodos);
};
showCompleted.onclick = event => {
    event.preventDefault();

    position = 3;
    showPosition(position);
    hideRows(".rowNotChecked");
    showRows(".rowChecked");
    showOrHideButtons(countTodos);
};
clearCompleted.onclick = event => {
    event.preventDefault();

    var x = document.querySelectorAll(".rowChecked");
    if (rowChecked.length > 0) {
        x.forEach(n => {
            n.remove()
            countTodos--;
        });
    }
    clearCompleted.style = "display:none";

    showOrHideButtons(countTodos);
};
markAll.onclick = event => {
    event.preventDefault();
    if (rowNotChecked.length > 0) {
        var x = document.querySelectorAll(".rowNotChecked");
        x.forEach(n => {
            n.setAttribute("class", 'rowChecked');
            n.cells[1].firstChild.style.textDecorationLine = "line-through";
            n.cells[1].firstChild.style.opacity = "0.5";
            n.cells[0].firstChild.checked = true;
            itemsleft--;
        });
    }
    else {
        var x = document.querySelectorAll(".rowChecked");
        x.forEach(n => {
            n.setAttribute("class", 'rowNotChecked');
            n.cells[1].firstChild.style.textDecorationLine = "none";
            n.cells[1].firstChild.style.opacity = "1";
            n.cells[0].firstChild.checked = false;
            itemsleft++;
        });
    }
    if (rowChecked.length > 0) {
        clearCompleted.style = "display:table-row";
    }
    else if (rowNotChecked.length > 0) {
        clearCompleted.style = "display:none";
    }
    showOrHideRows(position);
    itemsLeft.textContent = itemsleft + " items left";
    showOrHideButtons(countTodos);
}