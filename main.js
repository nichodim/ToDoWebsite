// Website link
// https://nichodim.github.io/ToDoWebsite/

// Creates a new instance of a todo item
function createToDo() {
    const d = document.createElement('div'); 
    const bd = document.createElement('div'); 
    const ld = document.createElement('div'); 
    const l = document.createElement('p');
    const b = document.createElement('button'); 

    if (textbox.value == "") {
        return; 
    }

    // Sets attributes for the new button and list item
    d.setAttribute('class', 'tododiv'); 
    bd.setAttribute('class', 'buttondiv'); 
    ld.setAttribute('class', 'listdiv'); 

    l.textContent = textbox.value; 
    l.setAttribute('class', 'listUA'); 

    b.setAttribute('onclick', `checkerClicked(${counters.id})`); 
    b.setAttribute('class', 'checkerUA'); 

    l.setAttribute('id', `l${counters.id}`); 
    b.setAttribute('id', `b${counters.id}`); 

    // Pushes to an array used to tell if a button is active
    counters.btnActive.push(false); 

    // Appends new button and list to the real world, they're all grown up ;,)
    document.getElementById("mainbody").append(d); 
    d.append(bd); 
    d.append(ld); 
    bd.appendChild(b); 
    ld.appendChild(l); 

    textbox.value = "";

    counters.id++; 
    saveState(); 
}

// Removes list and button if checked when remove button is clicked
function removeToDo() {
    const lA = document.getElementsByClassName('listA');
    const bA = document.getElementsByClassName('checkerA'); 
    if (lA.length == 0) {
        return; 
    }

    // Removes each instance in checked classes
    for (let i = 0; i < lA.length; i++) {
        counters.ignoreThese.push(lA[0].id.slice(1)); 
        lA[0].remove(); 
        bA[0].remove(); 
    }
    
    // Remove counter is reset
    counters.rcount = 0; 
    remb.innerHTML = `CLEAR (${counters.rcount})`; 

    cleanStorage(); 
    saveState(); 
}

// Changes list and button after checker button is clicked
function checkerClicked(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    const l = document.getElementById(`l${idnum}`); 
    const listnum = idnum - 1; 

    // Changes class of respective button and list
    // Changes remove button counter
    if (counters.btnActive[listnum] !== true) {
        b.className = 'checkerA'; 
        l.className = 'listA'; 
        counters.rcount++; 
        remb.innerHTML = `CLEAR (${counters.rcount})`; 
        counters.btnActive[listnum] = true; 
    }
    else {
        b.className = 'checkerUA'; 
        l.className = 'listUA'; 
        counters.rcount--; 
        remb.innerHTML = `CLEAR (${counters.rcount})`; 
        counters.btnActive[listnum] = false; 
    }
    saveState(); 
}

// Allows enter on textbox to press the ADD button
function textEnter() {
    textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key == "Enter") {
        document.getElementById("addbutton").click();
    }
    });
}