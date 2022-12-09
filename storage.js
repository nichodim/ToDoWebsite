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
            localStorage.setItem(`button${lists.id.slice(1)}`, JSON.stringify(buttons)); 
        }
    }
}

// Reset state of todo items from previous website uses
function ResetState() {
    // for every existing todo item in local storage...
    for (let i = 0; i < listArray.length; i++) {
        const l = document.createElement('li');
        const b = document.createElement('button'); 
        const lSaved = JSON.parse(localStorage.getItem(`list${i + 1}`))
        const bSaved = JSON.parse(localStorage.getItem(`button${i + 1}`))

        // Pipeline to set new element to old element and append

        // If todo marked true in ignoreThese, skip
        console.log("array: " + ignoreThese); 
        console.log('id value: ' + (i + 1)); 
        console.log('condition value: ' + ignoreThese.find(element => element == (i + 1))); 
        if (ignoreThese.find(element => element == (i + 1)) == undefined) {
            // Pipeline to set new element to old element and append
            l.textContent = lSaved.text; 
            l.setAttribute('class', lSaved.class); 

            b.setAttribute('onclick', `checkerClicked(${i + 1})`); 
            b.setAttribute('class', bSaved.class); 

            l.setAttribute('id', lSaved.id); 
            b.setAttribute('id', bSaved.id); 

            document.getElementById("myList").appendChild(l); 
            document.getElementById("buttondiv").appendChild(b); 
        }
    }
}

function cleanStorage() {
    for (let i = 0; i < listArray.length; i++) {
        if (ignoreThese != null) {
            if (ignoreThese.find(element => element == (i + 1)) != undefined) {
                localStorage.removeItem(`list${i + 1}`); 
                localStorage.removeItem(`button${i + 1}`); 
            }
        }
    }
}