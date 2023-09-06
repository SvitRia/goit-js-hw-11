import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
import { fetchList, createMarkUp } from "./api";

const {searchForm, gallerySelector, searchBtn, searchQuery, loadBtn} = refs

//axios.defaults.headers.common["x-api-key"] = "39130911-8039e4f23f6b3aae8a4a0d71c";

let page = 1;
let querySearch = "";
let totalPages = 1;
const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

loadBtn.classList.add("not-visible");
searchForm.addEventListener("submit", onFirstList)

async function  onFirstList(evt) {
    evt.preventDefault();
    gallerySelector.innerHTML = "";
    page = 1;
    querySearch = evt.currentTarget.searchQuery.value;
    console.log(querySearch);
    const result = await fetchList(querySearch, page);
    console.log(result);
    const { total, totalHits, hits} = result;
    searchQuery.value ="";
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    totalPages = Math.ceil(totalHits / perPage);
    gallerySelector.innerHTML = createMarkUp(hits);
    loadBtn.classList.remove("not-visible");
    
}

loadBtn.addEventListener("click", onMorePhoto)

async function  onMorePhoto(evt) {
    evt.preventDefault();
    page += 1;
    lightbox.refresh();
    console.log(totalPages);

    if(page > totalPages) {
        loadBtn.classList.add("not-visible");
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        return;
    }
    const result = await fetchList(querySearch, page);
    const {totalHits, hits} = result;
    console.log(hits);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    
    gallerySelector.insertAdjacentHTML ("beforeend",createMarkUp(hits));

    

}

