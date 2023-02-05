/* 
✅ Ver un listado de películas actuales (en cartelera), con su título, imagen y sinopsis.
✅ Tener un buscador de películas, que permita buscar por título.
⬜️ Marcar películas como favoritas para un usuario y poder verlas en un listado de favoritos.
⬜️ Marcar películas como pendientes para un usuario y poder verlas en un listado de pendientes.
⬜️ Ver el detalle de una película, con su título, imagen, sinopsis, fecha de estreno, duración, género, idioma, país de origen, presupuesto, recaudación, y un listado de actores y actrices que participan en ella.

*/

/***************** Selectores *****************/

/* const fragment = document.createDocumentFragment();
const template = document.querySelector(".template");
const main = document.querySelector(".main__board");
const errorSection = document.querySelector(".main__error")
const search = document.querySelector(".search__input");
const previousBtn = document.querySelector(".main__nav-previous");
const nextBtn = document.querySelector(".main__nav-next"); */

// Selectores del template
/* const wrapper = template.content.querySelector(".wrapper");
const link = template.content.querySelector(".wrapper__link");
const title = template.content.querySelector(".wrapper__title");
const img = template.content.querySelector(".wrapper__img");
const overview = template.content.querySelector(".wrapper__overview");
const btnFavourite = template.content.querySelector(".wrapper__favourite");
const btnPending = template.content.querySelector(".wrapper__pending"); */

import { nowPlaying } from "./nowPlaying.js";

nowPlaying();

