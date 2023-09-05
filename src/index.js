import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
import { fetchList, createMarkUp } from "./api";
import { createMarkUp } from "./api";
const {searchForm, gallerySelector, searchBtn, searchQuery, loadBtn} = refs

//axios.defaults.headers.common["x-api-key"] = "39130911-8039e4f23f6b3aae8a4a0d71c";

searchForm.addEventListener("submit", onFirstList)
let querySearch = "";
const perPage = 40;
const page = 1;
const totalPages = 1;
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

loadBtn.classList.add("not-visible");

async function  onFirstList(evt) {
    evt.preventDefault();
    gallerySelector.innerHTML = "";
    querySearch = evt.currentTarget.searchQuery.value;
    page = 1;
    const result = await fetchList(querySearch);

    const {total, totalHits, hits} = result;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    totalPages = Math.ceil(totalHits / perPage);
    gallerySelector.innerHTML = createMarkUp(hits);
    lightbox.refresh()
    let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt" });
    querySearch.reset()

    loadBtn.classList.replace("not-visible","visible");
}

loadBtn.addEventListener("click", onMorePhoto)
async function  onMorePhoto(evt) {
    evt.preventDefault();
    gallerySelector.innerHTML = "";
    page += 1;
    console.log(totalPages);
    if(currentPage > totalPages) {
        loadBtn.classList.replace("visible","not-visible");
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        return
    }
    const result = await fetchList(querySearch);
    const {total, totalHits, hits} = result;
    console.log(hits);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    totalPages = Math.ceil(totalHits / perPage);
    gallerySelector.innerHTML = createMarkUp(hits);
    
    let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt" });
    querySearch.reset()

}

