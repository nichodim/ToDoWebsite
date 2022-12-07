// https://nichodim.github.io/ToDoWebsite/
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

function saveState() {
    saveState2(document.getElementsByClassName('listUA')); 
    saveState2(document.getElementsByClassName('checkerUA')); 
    saveState2(document.getElementsByClassName('listA')); 
    saveState2(document.getElementsByClassName('checkerA')); 

    localStorage.setItem("counters", JSON.stringify(counters)); 

}

function saveState2(objname) {
    for (let i = 0; i < objname.length; i++) {
        if (ignoreThese[i] == (i + 1)) {
            localStorage.removeItem(`list${i + 1}`); 
            localStorage.removeItem(`button${i + 1}`); 
            return; 
        }
        if (objname[i].className.slice(0, 4) == 'list') {
            lists.id = objname[i].id; 
            lists.class = objname[i].className; 
            lists.text = objname[i].innerHTML; 
            localStorage.setItem(`list${i + 1}`, JSON.stringify(lists)); 
        } else {
            buttons.id = objname[i].id; 
            buttons.class = objname[i].className; 
            localStorage.setItem(`button${i + 1}`, JSON.stringify(buttons)); 
        }
    }
}

function ResetState() {
    for (let i = 0; i < listArray.length; i++) {
        const l = document.createElement('li');
        const b = document.createElement('button'); 
        const lSaved = JSON.parse(localStorage.getItem(`list${i + 1}`))
        const bSaved = JSON.parse(localStorage.getItem(`button${i + 1}`))

        if (ignoreThese[i + 1] != null) {
            if (ignoreThese[i + 1].ignore) {
                return; 
            }
        }

        l.textContent = lSaved.text; 
        l.setAttribute('class', lSaved.class); 

        b.setAttribute('onclick', `checkerClicked(${i + 1})`); 
        b.setAttribute('class', bSaved.class); 

        l.setAttribute('id', lSaved.id); 
        b.setAttribute('id', bSaved.id); 

        document.getElementById("myList").appendChild(l); 
        document.getElementById("buttondiv").appendChild(b); 

        //document.getElementById("myList").append(JSON.parse(localStorage.getItem(`list${i + 1}`)));
        //document.getElementById("buttondiv").append(JSON.parse(localStorage.getItem(`button${i + 1}`)));
    }
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
        ignoreThese.push(lA[i].id); 
        lA[0].remove(); 
        bA[0].remove(); 
    }
    
    // Remove counter is reset
    counters.rcount = 0; 
    remb.innerHTML = `CLEAR (${counters.rcount})`; 

    ToDoAdjustments(); 
    saveState(); 
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