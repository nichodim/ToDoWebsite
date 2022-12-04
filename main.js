function textEnter() {
    const textbox = document.getElementById("textbox");
    textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("addbutton").click();
    }
    });
}

function createToDo() {
    const txt = document.getElementById('textbox'); 
    const l = document.createElement('li');
    const b = document.createElement('button'); 

    if (txt.value === "") {
        return; 
    }
    if (id == 0) {
        id++; 
    }

    l.textContent = txt.value; 
    l.setAttribute('class', 'listUA'); 

    b.setAttribute('onclick', `checkerClicked(${id})`); 
    b.setAttribute('class', 'checkerUA'); 

    l.setAttribute('id', `l${id}`); 
    b.setAttribute('id', `b${id}`); 

    btnActive.push(false); 

    document.getElementById("myList").appendChild(l); 
    document.getElementById("buttondiv").appendChild(b); 
    txt.value = "";

    firstBAdjust(1); 
    id++; 
}

function firstBAdjust(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    b.style.marginTop = '7.65px'; 
}

function checkerClicked(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    const l = document.getElementById(`l${idnum}`); 
    const rb = document.getElementById('removebutton'); 

    if (btnActive[idnum] !== true) {
        b.className = 'checkerA'; 
        l.className = 'listA'; 
        rcount++; 
        rb.innerHTML = `Remove (${rcount})`; 
        btnActive[idnum] = true; 
    }
    else {
        b.className = 'checkerUA'; 
        l.className = 'listUA'; 
        rcount--; 
        rb.innerHTML = `Remove (${rcount})`; 
        btnActive[idnum] = false; 
    }
}

function removeToDo() {
    const rb = document.getElementById('removebutton'); 
    const lA = document.getElementsByClassName('listA');
    const bA = document.getElementsByClassName('checkerA'); 
    const bUA = document.getElementsByClassName('checkerUA'); 
    const bUAnums = []; 
    const lAlength = lA.length; 

    for (let i = 0; i < lAlength; i++) {
        lA[0].remove(); 
        bA[0].remove(); 
    }

    for (let i = 0; i < bUA.length; i++) {
        bUAnums.push(bUA[i].id.slice(1)); 
    }
    firstBAdjust(Math.min(... bUAnums)); 
    rcount = 0; 
    rb.innerHTML = `Remove (${rcount})`; 
}