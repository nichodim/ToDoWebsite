function saveState() {
    // Send all existing todo items through saving process into localstorage
    saveStateHTML(document.getElementsByClassName('listUA')); 
    saveStateHTML(document.getElementsByClassName('checkerUA')); 
    saveStateHTML(document.getElementsByClassName('listA')); 
    saveStateHTML(document.getElementsByClassName('checkerA')); 

    // Save current state of counters into localstorage
    localStorage.setItem("counters", JSON.stringify(counters)); 
    refreshMemList()
}

function saveStateHTML(objname) {
    if (objname.length == 0) {
        return; 
    }
    // Recreate id with i in order to process every todo item
    for (let i = 0; i < objname.length; i++) {
        // Set placeholder object's variables to match important todo info
        // Save the object with set variables with proper id number
        
        // If list item
        if (objname[i].className.slice(0, 4) == 'list') {
            lists.id = objname[i].id; 
            lists.class = objname[i].className; 
            lists.text = objname[i].innerHTML; 
            localStorage.setItem(`list${lists.id.slice(1)}`, JSON.stringify(lists)); 
        } 
        // If button item
        else {
            buttons.id = objname[i].id; 
            buttons.class = objname[i].className; 
            localStorage.setItem(`button${buttons.id.slice(1)}`, JSON.stringify(buttons)); 
        }
    }
}

// Reset state of todo items from previous website uses
function ResetState() {
    // for every existing todo item in local storage...
    for (let i = 0; i < memItemIDs.length; i++) {
        const d = document.createElement('div'); 
        const bd = document.createElement('div'); 
        const ld = document.createElement('div'); 
        const l = document.createElement('p');
        const b = document.createElement('button'); 
        const lSaved = JSON.parse(localStorage.getItem(`list${memItemIDs[i]}`))
        const bSaved = JSON.parse(localStorage.getItem(`button${memItemIDs[i]}`))

        // Pipeline to set new element to old element and append
        // If memory todo id is marked in ignoreThese, skip
        if (counters.ignoreThese.find(element => element == memItemIDs[i]) == undefined) {
            d.setAttribute('class', 'tododiv'); 
            bd.setAttribute('class', 'buttondiv'); 
            ld.setAttribute('class', 'listdiv'); 

            l.textContent = lSaved.text; 
            l.setAttribute('class', lSaved.class); 

            b.setAttribute('onclick', `checkerClicked(${memItemIDs[i]})`); 
            b.setAttribute('class', bSaved.class); 

            l.setAttribute('id', lSaved.id); 
            b.setAttribute('id', bSaved.id); 

            document.getElementById("mainbody").append(d); 
            d.append(bd); 
            d.append(ld); 
            bd.appendChild(b); 
            ld.appendChild(l); 
        }
    }
}

// Run through local storage and delete any that are marked by ignoreThese
function cleanStorage() {
    for (let i = 0; i < memItemIDs.length; i++) {
        if ((counters.ignoreThese.find(element => element == (memItemIDs[i])) != undefined) && (localStorage.getItem(`list${memItemIDs[i]}`) != null)) {
            localStorage.removeItem(`list${memItemIDs[i]}`); 
            localStorage.removeItem(`button${memItemIDs[i]}`); 
        }
    }
}

// Send all existing item ids in local storage to an array
// Used for future resetstate
function refreshMemList() {
    for (let i = 0; i < (counters.id - 1); i++) {
        if (localStorage.getItem(`list${i + 1}`) != null) {
            memItemIDs.push(i + 1); 
        }
    }
}