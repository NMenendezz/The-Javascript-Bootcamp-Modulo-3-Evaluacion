/* 
✅ Ver un listado de películas actuales (en cartelera), con su título, imagen y sinopsis.
✅ Tener un buscador de películas, que permita buscar por título.
⬜️ Marcar películas como favoritas para un usuario y poder verlas en un listado de favoritos.
⬜️ Marcar películas como pendientes para un usuario y poder verlas en un listado de pendientes.
⬜️ Ver el detalle de una película, con su título, imagen, sinopsis, fecha de estreno, duración, género, idioma, país de origen, presupuesto, recaudación, y un listado de actores y actrices que participan en ella.

*/

/***************** Selectores *****************/

const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main__board");
const search = document.querySelector(".search__input");
const previousBtn = document.querySelector(".main__nav-previous");
const nextBtn = document.querySelector(".main__nav-next");

// Selectores del template
const wrapper = template.content.querySelector(".wrapper");
const link = template.content.querySelector(".wrapper__link");
const title = template.content.querySelector(".wrapper__title");
const img = template.content.querySelector(".wrapper__img");
const overview = template.content.querySelector(".wrapper__overview");
const btnFavourite = template.content.querySelector(".wrapper__favourite");
const btnPending = template.content.querySelector(".wrapper__pending");

// Constantes de la API
const API_KEY = "api_key=465fe2cae55cadd50f352d27a0278c27";
const apiUrl = new URL(
  `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=es-ES`
);
const urlSearch = new URL(
  `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=es-ES&query=`
);
const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

// Página anterior
let page = 1;
previousBtn.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    nowPlaying();
  }
});

// Página siguiente
nextBtn.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    nowPlaying();
  }
});

// Función de llamada a la API
async function getData(url) {
  return new Promise((resolve, reject) => {
    if (new URL(url)) {
      resolve(fetch(url));
    } else {
      reject(new Error("Error al intentar acceder a la página"));
    }
  });
}

// Mostrar películas en cartekera
async function nowPlaying() {
  try {
    const resolve = await getData(`${apiUrl}&page=${page}`);
    if (resolve.status === 200) {
      const data = await resolve.json();
      console.log(data);
      main.innerHTML = "";
      data.results.forEach((movie) => {
        title.textContent = movie.title;
        img.src = `${IMG_PATH}${movie.poster_path}`;
        const palabras = movie.overview.split(" ");
        if (palabras.length !== 1) {
          overview.textContent = palabras.slice(0, 19).join(" ") + " ...";
        } else {
          overview.textContent = "No disponible";
        }
        const clone = template.cloneNode(true);
        fragment.append(clone.content);
      });
      main.append(fragment);
    } else if (resolve.status === 401) {
      console.log("API key no válida: debes introducir una clave válida");
    } else if (resolve.status === 404) {
      console.log("No se encontró la página");
    }
  } catch (error) {
    console.log(error);
  }
}

nowPlaying();

// Función de buscar al pulsar Enter
function getEnter() {
  search.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      const searchValue = search.value;
      console.log(searchValue);
      
        const value = searchValue.replace(/ /g, "+");
        searchMovie(value);
      
        search.value = "";
    }
  });
}

getEnter();

// Buscar películas
async function searchMovie(value) {
  try {
    const resolve = await getData(`${urlSearch}${value}`);
    if (resolve.status === 200) {
      const data = await resolve.json();
      console.log(data);
      main.innerHTML = "";
      data.results.forEach((movie) => {
        title.textContent = movie.title;
        img.src = `${IMG_PATH}${movie.poster_path}`;
        const palabras = movie.overview.split(" ");
        if (palabras.length !== 1) {
          overview.textContent = palabras.slice(0, 19).join(" ") + " ...";
        } else {
          overview.textContent = "No disponible";
        }
        const clone = template.cloneNode(true);
        fragment.append(clone.content);
      });
      main.append(fragment);
    } else if (resolve.status === 401) {
      console.log("API key no válida: debes introducir una clave válida");
    } else if (resolve.status === 404) {
      console.log("No se encontró la página");
    } else if (resolve.status === 422) {
      console.log("Introduzca al menos una letra");
    }
  } catch (error) {
    console.log(error);
  }
}
