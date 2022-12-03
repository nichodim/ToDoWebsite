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
    id++; 

    document.getElementById("myList").appendChild(l); 
    document.getElementById("buttondiv").appendChild(b); 
    txt.value = "";
}

function checkerClicked(idnum) {
    const b = document.getElementById(`b${idnum}`); 
    const l = document.getElementById(`l${idnum}`); 

    if (btnActive[idnum] !== true) {
        b.className = 'checkerA'; 
        l.className = 'listA'; 
        btnActive[idnum] = true; 
    }
    else {
        b.className = 'checkerUA'; 
        l.className = 'listUA'; 
        btnActive[idnum] = false; 
    }
}