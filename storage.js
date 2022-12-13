function saveState() {
    // Send all existing todo items through saving process into localstorage
    saveStateHTML(document.getElementsByClassName('listUA')); 
    saveStateHTML(document.getElementsByClassName('checkerUA')); 
    saveStateHTML(document.getElementsByClassName('listA')); 
    saveStateHTML(document.getElementsByClassName('checkerA')); 
    // console.log('-----------------------------------------'); 

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
            // console.log('Checker ' + objname[i].id + ': ' + objname[i].className); 
            buttons.class = objname[i].className; 
            // console.log('Checker ' + buttons.id + ': ' + buttons.class); 
            localStorage.setItem(`button${buttons.id.slice(1)}`, JSON.stringify(buttons)); 
            // console.log(`Saved button id: button${buttons.id.slice(1)}`); 
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
        // console.log("array: " + counters.ignoreThese); 
        // console.log('id value: ' + (i + 1)); 
        // console.log('condition value: ' + counters.ignoreThese.find(element => element == (i + 1))); 
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
            i--; 
            icompensator++; 
        }
    }
}

function cleanStorage() {
    for (let i = 0; i < listArray.length; i++) {
        if (counters.ignoreThese != []) {
            if (counters.ignoreThese.find(element => element == (i + 1)) != undefined) {
                localStorage.removeItem(`list${i + 1}`); 
                localStorage.removeItem(`button${i + 1}`); 
            }
        }
    }
}