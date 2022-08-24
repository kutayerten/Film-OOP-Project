const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
 
// Tum eventleri yukleme

eventListener();

function eventListener(){
    form.addEventListener("submit",addFilm);

    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //hata
        UI.displayMessages("Tum alanlari doldurun","danger");
    }
    else{
        //Yeni Film olusturma
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm); // Arayuze Film ekleme
        Storage.addFilmToStorage(newFilm);//Storage Film Ekleme
        UI.displayMessages("FIlm Basariyla eklendi","success");
    }

    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessages("silme islemi basarili","success");
    }
}

function clearAllFilms(){
    if (confirm("Eminmisiniz ?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

    
}