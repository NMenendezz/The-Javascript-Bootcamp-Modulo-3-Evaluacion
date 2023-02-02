/* 
⬜️ Ver un listado de películas actuales (en cartelera), con su título, imagen y sinopsis.
⬜️ Tener un buscador de películas, que permita buscar por título.
⬜️ Marcar películas como favoritas para un usuario y poder verlas en un listado de favoritos.
⬜️ Marcar películas como pendientes para un usuario y poder verlas en un listado de pendientes.
⬜️ Ver el detalle de una película, con su título, imagen, sinopsis, fecha de estreno, duración, género, idioma, país de origen, presupuesto, recaudación, y un listado de actores y actrices que participan en ella.

*/

/***************** Selectores *****************/

const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main__board");
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

let page = 1;
previousBtn.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    nowPlaying();
  }
});

nextBtn.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    nowPlaying();
  }
});
const API_KEY = "api_key=465fe2cae55cadd50f352d27a0278c27";
const api_url = new URL(
  `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}&language=es-ES`
);
const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

async function getData(url) {
  return new Promise((resolve, reject) => {
    if (new URL(url)) {
      resolve(fetch(url));
    } else {
      reject(new Error("Error al intentar acceder a la página"));
    }
  });
}

async function nowPlaying() {
  try {
    const resolve = await getData(`${api_url}&page=${page}`);
    if (resolve.status === 200) {
      const data = await resolve.json();
      console.log(data);
      main.innerHTML = "";
      data.results.forEach((movie) => {
        title.textContent = movie.title;
        img.src = `${IMG_PATH}${movie.poster_path}`;
        const palabras = movie.overview.split(" ");
        if(palabras.length !== 1) {
          overview.textContent = palabras.slice(0, 19).join(" ") + " ...";
        } else {
          overview.textContent = "No disponible"
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
/*
async function run() {
  try {
    const result = await getData(url);
    const json = await result.json();
    const results = json.results;
    console.log(results);
    for (const result of results) {
      img.src = `https://www.themoviedb.org/t/p/w440_and_h660_face${result.poster_path}`;
      title.textContent = result.title;
      
      const palabras = result.overview.split(" ");
      overview.textContent = palabras.slice(0, 19).join(" ") + "...";
      const clone = template.cloneNode(true);
      fragment.append(clone.content);
      main.append(fragment);
      console.log(result.title);
    }
  } catch (error) {
    console.log(error);
  }
}


run();
 */
