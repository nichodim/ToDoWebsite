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
    l.setAttribute('class', 'list'); 

    b.setAttribute('onclick', `checkerClicked(${id})`); 
    b.setAttribute('class', 'checker'); 

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
        l.style.color = '#54c6ff'; 
        b.style.backgroundColor = '#54c6ff'; 
        btnActive[idnum] = true; 
    }
    else {
        l.style.color = 'black'; 
        b.style.backgroundColor = 'aliceblue'; 
        btnActive[idnum] = false; 
    }
}