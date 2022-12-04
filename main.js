// Allows enter on textbox to press the ADD button
function textEnter() {
    textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("addbutton").click();
    }
    });
}

// Creates a new instance of a todo item
function createToDo() {
    const l = document.createElement('li');
    const b = document.createElement('button'); 

    if (textbox.value === "") {
        return; 
    }
    if (id == 0) {
        id++; 
    }

    // Sets attributes for the new button and list item
    l.textContent = textbox.value; 
    l.setAttribute('class', 'listUA'); 

    b.setAttribute('onclick', `checkerClicked(${id})`); 
    b.setAttribute('class', 'checkerUA'); 

    l.setAttribute('id', `l${id}`); 
    b.setAttribute('id', `b${id}`); 

    // Pushes to an array used to tell if a button is active
    btnActive.push(false); 

    // Appends new button and list to the real world, they're all grown up ;,)
    document.getElementById("myList").appendChild(l); 
    document.getElementById("buttondiv").appendChild(b); 

    textbox.value = "";
    if (id == 1) {
        firstBAdjust(1); 
    }
    id++; 
}

// Adjusts first button to align better with list
function firstBAdjust(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    b.style.marginTop = '7.65px'; 
}

// Changes list and button after checker button is clicked
function checkerClicked(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    const l = document.getElementById(`l${idnum}`); 

    // Changes class of respective button and list
    // Changes remove button counter
    if (btnActive[idnum] !== true) {
        b.className = 'checkerA'; 
        l.className = 'listA'; 
        rcount++; 
        remb.innerHTML = `CLEAR (${rcount})`; 
        btnActive[idnum] = true; 
    }
    else {
        b.className = 'checkerUA'; 
        l.className = 'listUA'; 
        rcount--; 
        remb.innerHTML = `CLEAR (${rcount})`; 
        btnActive[idnum] = false; 
    }
}

// Removes list and button if checked when remove button is clicked
function removeToDo() {
    const lA = document.getElementsByClassName('listA');
    const bA = document.getElementsByClassName('checkerA'); 
    const lAlength = lA.length; 

    // Removes each instance in checked classes
    for (let i = 0; i < lAlength; i++) {
        lA[0].remove(); 
        bA[0].remove(); 
    }

    // Remove counter is reset
    rcount = 0; 
    remb.innerHTML = `CLEAR (${rcount})`; 

    ToDoAdjustments(); 
}

// Due to the previous id1 button often being deleted, a new
// first button is found to adjust beginning margin
// Definitely a better way to do this
function ToDoAdjustments() {
    const bUA = document.getElementsByClassName('checkerUA'); 
    const bUAnums = []; 

    for (let i = 0; i < bUA.length; i++) {
        bUAnums.push(bUA[i].id.slice(1)); 
    }
    firstBAdjust(Math.min(... bUAnums)); 
}