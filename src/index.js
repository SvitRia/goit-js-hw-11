//mport axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
import { fetchList, fetchStartList } from "./api";
import { createMarkUp, createStartMarkUp } from './markup';
const {searchForm, gallerySelector, searchBtn, searchQuery, loadBtn} = refs

let page = 1;
let querySearch = "";
let totalPages = 1;
const perPage = 40;

async function onStartForm() { 

loadBtn.classList.add("not-visible");
const resultAll = await fetchStartList()
const { hits} = resultAll;
gallerySelector.innerHTML = createStartMarkUp(hits);
lightbox.refresh();
}

onStartForm()
 
loadBtn.classList.add("not-visible");
searchForm.addEventListener("submit", onSearchFormSubmit)
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt", overlayOpacity: 0.5 });
      
async function  onSearchFormSubmit(evt) {
    evt.preventDefault();
    loadBtn.classList.add("not-visible");
    gallerySelector.innerHTML = "";
    page = 1;
    querySearch = evt.currentTarget.searchQuery.value;
    if(!querySearch.trim()) 
        return
    }
    const result = await fetchList(querySearch, page);
    const { totalHits, hits} = result;
    searchQuery.value = "";
    if(totalHits === 0) {
        loadBtn.classList.add("not-visible");
        Notiflix.Notify.warning(`Sorry, there are no images matching your search query. Please try again.`)
        return;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
   
    totalPages = Math.ceil(totalHits / perPage);
    gallerySelector.innerHTML = createMarkUp(hits);
    lightbox.refresh();
    if(totalHits < perPage) {
        loadBtn.classList.add("not-visible");
        return;
    }
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
    
    gallerySelector.insertAdjacentHTML ("beforeend",createMarkUp(hits));
    lightbox.refresh();
}

