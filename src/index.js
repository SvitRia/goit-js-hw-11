import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
import { fetchList, createMarkUp } from "./api";
import { createMarkUp } from "./api";
const {searchForm, gallerySelector, searchBtn, searchQuery} = refs

//axios.defaults.headers.common["x-api-key"] = "39130911-8039e4f23f6b3aae8a4a0d71c";

searchForm.addEventListener("submit", onFirstList)
let querySearch = "";
const perPage = 40;
const currentPage = 1;
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
//textSearch = searchForm.input.value;
//console.log(textQuery);


async function  onFirstList(evt) {
    evt.preventDefault();
    gallerySelector.innerHTML = "";
    querySearch = evt.currentTarget.searchQuery.value;
    console.log(querySearch);
    const result = await fetchList(querySearch);
    console.dir(result);
    const {total, totalHits, hits} = result;
    ///const vievTotalHits = `<h2 class="total-hits>Hooray! We found "${totalHits} images.</h2>`;
    gallerySelector.innerHTML = createMarkUp(hits);
    
    let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt" });
}



