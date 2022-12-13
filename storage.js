function saveState() {
    // Send all existing todo items through saving process into localstorage
    saveStateHTML(document.getElementsByClassName('listUA')); 
    saveStateHTML(document.getElementsByClassName('checkerUA')); 
    saveStateHTML(document.getElementsByClassName('listA')); 
    saveStateHTML(document.getElementsByClassName('checkerA')); 

    // Save current state of counters into localstorage
    localStorage.setItem("counters", JSON.stringify(counters)); 
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
    let icompensator = 1; 
    const createdIDs = []; 
    // for every existing todo item in local storage...
    for (let i = 0; i < listArray.length; i++) {
        const l = document.createElement('li');
        const b = document.createElement('button'); 
        const lSaved = JSON.parse(localStorage.getItem(`list${i + icompensator}`))
        const bSaved = JSON.parse(localStorage.getItem(`button${i + icompensator}`))

        // Pipeline to set new element to old element and append

        // If todo id is marked in ignoreThese, skip
        // if i + comp value has been used for instantiation before, skip
        if (counters.ignoreThese.find(element => element == (i + icompensator)) == undefined && createdIDs.find(element => element == (i + icompensator)) == undefined) {
            l.textContent = lSaved.text; 
            l.setAttribute('class', lSaved.class); 

            b.setAttribute('onclick', `checkerClicked(${i + icompensator})`); 
            b.setAttribute('class', bSaved.class); 

            l.setAttribute('id', lSaved.id); 
            b.setAttribute('id', bSaved.id); 

            document.getElementById("myList").appendChild(l); 
            document.getElementById("buttondiv").appendChild(b); 
            createdIDs.push(i + icompensator); 
            icompensator = 1; 
        } else {
            // Keep number of interations necessary but add to comp value to find next list item in storage
            i--; 
            icompensator++; 
        }
    }
}

// Run through local storage and delete any that are marked by ignoreThese
function cleanStorage() {
    if (counters.ignoreThese != []) {
        for (let i = 0; i < listArray.length; i++) {
            if (counters.ignoreThese.find(element => element == (i + 1)) != undefined) {
                localStorage.removeItem(`list${i + 1}`); 
                localStorage.removeItem(`button${i + 1}`); 
            }
        }
    }
}