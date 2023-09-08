//import Notiflix from 'notiflix';
import axios from "axios";

    const BAS_URL = "https://pixabay.com/api/";
    const API_KEY = "39130911-8039e4f23f6b3aae8a4a0d71c";

export async function fetchStartList() {
        const params = new URLSearchParams({
            key: API_KEY,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
          });
     
          const response = await axios.get(`${ BAS_URL }?&${ params }`);
         
          return response.data;
        }    

export async function fetchList(querySearch, page) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: `${querySearch}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: `${page}`,
        per_page: "40",
      });
 
      const response = await axios.get(`${ BAS_URL }?&${ params }`);
     
      return response.data;
    }
  
