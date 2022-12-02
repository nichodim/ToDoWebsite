function createToDo() {
    const txt = document.getElementById('textbox'); 
    const l = document.createElement('li');
    const b = document.createElement('button'); 

    const txtnos = txt.value.split(" ").join(""); 

    if (txt.value === "") {
        return; 
    }

    l.textContent = txt.value; 
    l.setAttribute('class', 'list'); 

    b.setAttribute('id', txtnos); 
    b.setAttribute('onclick', 'checkerClicked()'); 
    b.setAttribute('class', 'checker'); 

    document.getElementById("myList").appendChild(l); 
    document.getElementById("buttondiv").appendChild(b); 
    document.getElementById('textbox').value = "";
}

function checkerClicked() {
    
}

