const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");




function addTask(){
    if(inputbox.value === ''){
        alert("Você deve adicionar uma tarefa!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputbox.value = "";
    saveData()
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false)

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showData(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showData()

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();

    const nav = document.getElementById('nav');
    nav.classList.toggle('active');

    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', 'true');

    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu"')
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);






