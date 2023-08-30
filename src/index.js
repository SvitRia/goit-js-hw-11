import axios from "axios";
import Notiflix from 'notiflix';
import { refs } from "./refs";
import { fetchList } from "./api";
const {searchForm, searchBtn, searchQuery} = refs

axios.defaults.headers.common["x-api-key"] = "39130911-8039e4f23f6b3aae8a4a0d71c";

searchBtn.addEventListener("submit", onSearchList
)
const textQuery = searchQuery.value;
console.log(textQuery);

function  onSearchList(evt) {
    evt.preventDefault();
    
    textSearch = searchForm.input.value;
    console.log(textQuery);
    fetchList(textQuery).then(data => {console.log(data);})
}



