import { API_KEY, IMG_PATH, getData, nowPlaying } from "./nowPlaying.js";

/***************** Selectores *****************/
const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main__board");
const errorSection = document.querySelector(".main__error");
const search = document.querySelector(".search__input");
const mainNav = document.querySelector(".main__nav")
const upBtn = document.querySelector(".main__up");;
const footer = document.querySelector(".footer")

// Selectores del template
const wrapper = template.content.querySelector(".wrapper");
const link = template.content.querySelector(".wrapper__link");
const title = template.content.querySelector(".wrapper__title");
const img = template.content.querySelector(".wrapper__img");
const overview = template.content.querySelector(".wrapper__overview");
const btnFavourite = template.content.querySelector(".wrapper__favourite");
const btnPending = template.content.querySelector(".wrapper__pending");

const urlSearch = new URL(
  `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=es-ES&query=`
);

let page = 1;

// Función de buscar al pulsar Enter
let value;
search.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    page = 1;
    value = search.value.replace(/ /g, "+");
    search.value = "";
    searchMovies(value, page);
    main.innerHTML = "";
    errorSection.innerHTML = "";
    mainNav.style.display = 'none'
    footer.style.height = '4rem'
    footer.style.alignItems = "center"
    upBtn.style.bottom = '0'
  }
});

/* 
Buscar películas:
  - Necesita el valor que he introducido en el campo de búsqueda
*/
async function searchMovies(value, page) {
  try {
    const resolve = await getData(`${urlSearch}${value}&page=${page}`);
    displayMovies(resolve);
  } catch (error) {
    console.log(error);
  }
}

/* 
Mostrar las peliculas en pantalla: 
  - Necesito el valor del campo de búsqueda
  - Necesito la página a mostrar
*/
let totalPages;
async function displayMovies(resolve) {
  if (resolve.status === 200) {
    const data = await resolve.json();
    console.log(data);
    totalPages = data.total_pages;
    data.results.forEach((movie) => {
      title.textContent = movie.title;
      img.src = `${IMG_PATH}${movie.poster_path}`;
      if (movie.poster_path === null) {
        img.src = "./img/noimg.png"
      }
      const words = movie.overview.split(" ");
      if (words.length !== 1) {
        overview.textContent = words.slice(0, 19).join(" ") + " ...";
      } else {
        overview.textContent = "No disponible";
      }
      const clone = template.cloneNode(true);
      fragment.append(clone.content);
    });
    main.append(fragment);
    if(data.total_results === 0) {
      errorSection.innerHTML = "";
      const p = document.createTextNode("No se encontró ninguna coincidencia")
      errorSection.append(p);
      nowPlaying();
    }
  } else if (resolve.status === 401) {
    console.log("API key no válida: debes introducir una clave válida");
  } else if (resolve.status === 404) {
    console.log("No se encontró la página");
  } else if (resolve.status === 422) {
    console.log("Introduzca al menos una letra");
  }
}

window.addEventListener("scroll", function() {
  // Verificar si se ha alcanzado el final de la página
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if(page < totalPages) {
      page += 1;
      searchMovies(value, page);
    }
  }
});