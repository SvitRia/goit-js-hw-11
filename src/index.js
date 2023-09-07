//import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
import { fetchList, createMarkUp } from "./api";

const {searchForm, gallerySelector, searchBtn, searchQuery, loadBtn} = refs

let page = 1;
let querySearch = "";
let totalPages = 1;
const perPage = 40;



loadBtn.classList.add("not-visible");
searchForm.addEventListener("submit", onSearchFormSubmit)
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt", overlayOpacity: 0.5 });
async function  onSearchFormSubmit(evt) {
    evt.preventDefault();
    gallerySelector.innerHTML = "";
    page = 1;
    querySearch = evt.currentTarget.searchQuery.value;
    if(!querySearch.trim()) {
        loadBtn.classList.add("not-visible");
        return
    }
    const result = await fetchList(querySearch, page);
    const { totalHits, hits} = result;
    searchQuery.value = "";
    if(totalHits === 0) {
        Notiflix.Notify.warning(`Sorry, there are no images matching your search query. Please try again.`)
        return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    if(totalHits < perPage) {
        return;
    }
    totalPages = Math.ceil(totalHits / perPage);
    gallerySelector.innerHTML = createMarkUp(hits);
    lightbox.refresh();
    loadBtn.classList.remove("not-visible");
}

loadBtn.addEventListener("click", onMorePhoto)

async function  onMorePhoto(evt) {
    evt.preventDefault();
    page += 1;
   
    if( page === totalPages ) {
        loadBtn.classList.add("not-visible");
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }

    const result = await fetchList(querySearch, page);
   
    const { hits} = result;
    console.log(hits);
    
    gallerySelector.insertAdjacentHTML ("beforeend",createMarkUp(hits));
    lightbox.refresh();
}

