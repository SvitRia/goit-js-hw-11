//import Notiflix from 'notiflix';
import axios from "axios";

    const BAS_URL = "https://pixabay.com/api/";
    const API_KEY = "39130911-8039e4f23f6b3aae8a4a0d71c";

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
      console.dir(response);
     
      return response.data;
    }
  
export function createMarkUp(results) {
    const markUp = results.map((result) => 
    `<div class="photo-card">
       <a class="gallery__item" href="${result.largeImageURL}"><img class="gallery__image" src="${result.webformatURL}" alt="${result.tags}" loading="lazy"/>
          <div class="info">
              <p class="info-item">
                <b>Likes:</b><br />${result.likes}
              </p>
              <p class="info-item">
                <b>Views:</b><br />${result.views}
              </p>
              <p class="info-item">
                <b>Comments:</b><br />${result.comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b><br />${result.downloads}
              </p>
         </div>
     </a>
 </div>`).join("");

 return markUp;
};
  
    