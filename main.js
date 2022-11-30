function createToDo() {
    const txt = document.getElementById('textbox'); 
    const l = document.createElement('li'); 

    l.textContent = txt.value; 
    l.setAttribute('class', 'list'); 

    document.getElementById("myList").appendChild(l); 
    document.getElementById('textbox').value = "";
}