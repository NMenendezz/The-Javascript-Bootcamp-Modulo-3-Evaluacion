/***************** Selectores *****************/

const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main__board");
const errorSection = document.querySelector(".main__error");
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

export const API_KEY = "api_key=465fe2cae55cadd50f352d27a0278c27";
const apiUrl = new URL(
  `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=es-ES`
);
export const IMG_PATH = "https://image.tmdb.org/t/p/w500/";
export let totalPages;

// Función de llamada a la API
export async function getData(url) {
  return new Promise((resolve, reject) => {
    if (new URL(url)) {
      resolve(fetch(url));
    } else {
      reject(new Error("Error al intentar acceder a la página"));
    }
  });
}

// Obtener respuesta de la llamada a la API
export async function getResponse(resolve) {
  if (resolve.status === 200) {
    const data = await resolve.json();
    console.log(data);
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
  } else if (resolve.status === 401) {
    console.log("API key no válida: debes introducir una clave válida");
  } else if (resolve.status === 404) {
    console.log("No se encontró la página");
  } else if (resolve.status === 422) {
    console.log("Introduzca al menos una letra");
  }
}

export async function nowPlaying() {
  try {
    const resolve = await getData(`${apiUrl}&page=${page}`);
    getResponse(resolve);
  } catch (error) {
    console.log(error);
  }
}


// Página anterior
let page = 1;
previousBtn.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    main.innerHTML = "";
    nowPlaying();
  }
});

// Página siguiente
nextBtn.addEventListener("click", () => {
  if (page < totalPages) {
    page += 1;
    main.innerHTML = "";
    nowPlaying();
  }
});