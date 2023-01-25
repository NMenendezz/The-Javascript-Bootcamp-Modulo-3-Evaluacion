/* 
⬜️ Ver un listado de películas actuales (en cartelera), con su título, imagen y sinopsis.
⬜️ Tener un buscador de películas, que permita buscar por título.
⬜️ Marcar películas como favoritas para un usuario y poder verlas en un listado de favoritos.
⬜️ Marcar películas como pendientes para un usuario y poder verlas en un listado de pendientes.
⬜️ Ver el detalle de una película, con su título, imagen, sinopsis, fecha de estreno, duración, género, idioma, país de origen, presupuesto, recaudación, y un listado de actores y actrices que participan en ella.

*/

/* const url = new URL ('https://api.themoviedb.org/3/movie/now_playing?api_key=465fe2cae55cadd50f352d27a0278c27&language=es-ES');

async function getData(url) {
  return new Promise((resolve, reject) => {
    if(url.protocol){
      resolve(fetch(url))
    } else {
      reject(new Error('Error al intentar acceder a la página'))
    }
  })
}

async function run() {
try {
  const result = await getData(url)
  const json = await result.json();

  console.log(json)

}

catch (error) {
  console.log(error)
}
} */

// run();

/***************** Selectores *****************/

const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main");

// Selectores del template
const wrapper = template.content.querySelector(".wrapper");
const link = template.content.querySelector(".wrapper__link");
const title = template.content.querySelector(".wrapper__title");
const img = template.content.querySelector(".wrapper__img");
const overview = template.content.querySelector(".wrapper__overview");
const btnFavourite = template.content.querySelector(".wrapper__favourite");
const btnPending = template.content.querySelector(".wrapper__pending");


