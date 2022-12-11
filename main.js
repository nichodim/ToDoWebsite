// Website link
// https://nichodim.github.io/ToDoWebsite/

// Creates a new instance of a todo item
function createToDo() {
    const l = document.createElement('li');
    const b = document.createElement('button'); 

    if (textbox.value === "") {
        return; 
    }

    // Sets attributes for the new button and list item
    l.textContent = textbox.value; 
    l.setAttribute('class', 'listUA'); 

    b.setAttribute('onclick', `checkerClicked(${counters.id})`); 
    b.setAttribute('class', 'checkerUA'); 

    l.setAttribute('id', `l${counters.id}`); 
    b.setAttribute('id', `b${counters.id}`); 

    // Pushes to an array used to tell if a button is active
    counters.btnActive.push(false); 

    // Appends new button and list to the real world, they're all grown up ;,)
    document.getElementById("myList").appendChild(l); 
    document.getElementById("buttondiv").appendChild(b); 

    textbox.value = "";
    if (counters.id == 1) {
        firstBAdjust(1); 
    } else {
        ToDoAdjustments();
    }

    counters.id++; 
    saveState(); 
}

// Removes list and button if checked when remove button is clicked
function removeToDo() {
    const lA = document.getElementsByClassName('listA');
    const bA = document.getElementsByClassName('checkerA'); 
    const lAlength = lA.length; 
    if (lAlength == 0) {
        return; 
    }

    // Removes each instance in checked classes
    for (let i = 0; i < lAlength; i++) {
        counters.ignoreThese.push(lA[0].id.slice(1)); 
        lA[0].remove(); 
        bA[0].remove(); 
    }
    
    // Remove counter is reset
    counters.rcount = 0; 
    remb.innerHTML = `CLEAR (${counters.rcount})`; 

    ToDoAdjustments(); 
    cleanStorage(); 
    saveState(); 
}

// Changes list and button after checker button is clicked
function checkerClicked(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    const l = document.getElementById(`l${idnum}`); 

    // Changes class of respective button and list
    // Changes remove button counter
    if (counters.btnActive[idnum] !== true) {
        b.className = 'checkerA'; 
        l.className = 'listA'; 
        counters.rcount++; 
        remb.innerHTML = `CLEAR (${counters.rcount})`; 
        counters.btnActive[idnum] = true; 
    }
    else {
        b.className = 'checkerUA'; 
        l.className = 'listUA'; 
        counters.rcount--; 
        remb.innerHTML = `CLEAR (${counters.rcount})`; 
        counters.btnActive[idnum] = false; 
    }
    saveState(); 
}

// Allows enter on textbox to press the ADD button
function textEnter() {
    textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("addbutton").click();
    }
    });
}

// Adjusts first button to align better with list
function firstBAdjust(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    b.style.marginTop = '7.65px'; 
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