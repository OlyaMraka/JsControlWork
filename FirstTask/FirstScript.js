// ----------------------- Creation of the page --------------------------

// In this section, we create the page layout and structure,
// defining how each element will be arranged and displayed.

let checkBoxId = 1;

let mainContainer = document.createElement('div');
mainContainer.className = 'main-container';

let title = document.createElement('h1');
title.innerText = 'Test';
mainContainer.appendChild(title);

// ----------------------- Input section --------------------------
// In this part, we create a form where users can input keys and values.
let firstForm = document.createElement('form');
firstForm.className = 'first-form';

let inputBlock = document.createElement('div');
inputBlock.className = 'input-block';

let formLabel = document.createElement('label');
formLabel.className = 'form-label'
formLabel.innerText = 'Name/Value Pair';

let formInput = document.createElement('input');
formInput.className = 'from-input';

inputBlock.append(formLabel, formInput);

let submitBtn = document.createElement('button');
submitBtn.className = 'submit-button';
submitBtn.innerText = 'Add';

firstForm.append(inputBlock, submitBtn);
mainContainer.appendChild(firstForm);

// -------------------------- Operation Panel -------------------------------
// In the following lines of code, I create a block to display the added pairs,
// as well as buttons to manage them.
let operationsBlock = document.createElement('div');
operationsBlock.className = 'operations-block';

let viewBlock = document.createElement('div');
viewBlock.className = 'view-block';
let viewTitle = document.createElement('h2');
viewTitle.innerText = 'Name/Value Pair List'
let viewBord = document.createElement('div');
viewBord.id = 'view-bord';
viewBord.className = 'view-bord';
viewBlock.append(viewTitle, viewBord);

let operationsPanel = document.createElement('div');
operationsPanel.className = 'operations-panel';

let operations = ['Sort by Name', 'Sort by Value', 'Delete']
for (const operation of operations) {
    let operationButton = document.createElement('button');
    operationButton.innerText = operation;
    operationsPanel.appendChild(operationButton);

    operationButton.addEventListener('click', () => {
        if(operation === 'Sort by Name') {
            sortByName();
        }
        else if(operation === 'Sort by Value') {
            sortByValue();
        }
        else if(operation === 'Delete') {
            deleteElement();
        }
    })
}

operationsBlock.append(viewBlock, operationsPanel);
mainContainer.appendChild(operationsBlock);

document.body.appendChild(mainContainer);

// ------------------------- Event handlers --------------------------------

// This is the window load event. When the window loads,
// we retrieve the list of existing pairs from local storage and display them on the screen.
window.onload = function() {
    let elemList = JSON.parse(localStorage.getItem('elemList')) || [];
    printList(elemList)
}

// This is the button click event on the form. When clicked, the input is validated,
// and then the new pair is added to local storage as well as the UI.
firstForm.onsubmit = function(event) {
    event.preventDefault();

    let newElement = formInput.value.split('=');

    // Validation part
    if(newElement.length !== 2) {
        alert("Введіть пару у форматі Name=Value! Можна вводити лише одну пару!");
        formInput.value = '';
        return;
    }

    let name = newElement[0].trim();
    let value = newElement[1].trim();
    let newListElem = name + "=" + value;

    if(!name.match(/^[A-Za-zА-Яа-я0-9]+$/) ||
        !value.match(/^[A-Za-zА-Яа-я0-9]+$/)) {
        alert("Ключі і значення можуть містити лише цифри і букви. Інші символи заборонено!");
        formInput.value = '';
        return;
    }

    // Adding to local storage
    let elementList = JSON.parse(localStorage.getItem('elemList')) || [];
    elementList.push(newListElem);
    localStorage.setItem('elemList', JSON.stringify(elementList));

    // Adding to UI part
    addElement(newListElem)

    // Clearing input
    formInput.value = '';
}

// A helper function created to display the list of pairs.
function printList(list) {
    for (let elem of list) {
        addElement(elem);
    }
}

// A helper function that creates a div containing a checkbox and a label.
function addElement(elem){
    let pairDiv = document.createElement('div');
    pairDiv.className = 'pair-div';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = String(checkBoxId);

    let label = document.createElement('label');
    label.htmlFor = String(checkBoxId);
    label.textContent = elem;

    pairDiv.append(checkbox, label);
    viewBord.appendChild(pairDiv);

    ++checkBoxId;
}

// A function that is called when the 'Sort by Name' button is clicked.
function sortByName() {
    let elemList = JSON.parse(localStorage.getItem('elemList')) || [];
    elemList = elemList.sort((a, b) => a.split("=")[0] < b.split("=")[0] ? -1 : 1);
    localStorage.setItem('elemList', JSON.stringify(elemList));
    viewBord.replaceChildren();
    printList(elemList);
}

// A function that is called when the 'Sort by Value' button is clicked.
function sortByValue() {
    let elemList = JSON.parse(localStorage.getItem('elemList')) || [];
    elemList = elemList.sort((a, b) => a.split("=")[1] < b.split("=")[1] ? -1 : 1);
    localStorage.setItem('elemList', JSON.stringify(elemList));
    viewBord.replaceChildren();
    printList(elemList);
}

// A function that is called when the 'Delete' button is clicked.
function deleteElement() {
    let elemList = JSON.parse(localStorage.getItem('elemList')) || [];
    let checkboxContainer = document.getElementById('view-bord')
    let checkboxes = checkboxContainer.getElementsByClassName('pair-div');
    for (let i = checkboxes.length - 1; i > -1; i--) {
        let checkbox = checkboxes[i].querySelector('input[type="checkbox"]');
        if(checkbox.checked){
            let index = elemList.indexOf(checkboxes[i].textContent);
            elemList.splice(index, 1);
            checkbox.parentElement.remove();
        }
    }
    localStorage.setItem('elemList', JSON.stringify(elemList));
}

