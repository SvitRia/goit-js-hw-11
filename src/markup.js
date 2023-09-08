export function createStartMarkUp(results) {
    const markUp = results.map((result) => 
    `<div class="photo-card">
       <a class="gallery__item" href="${result.largeImageURL}"><img class="gallery__image" src="${result.webformatURL}" alt="${result.tags}" loading="lazy"/>
          
     </a>
 </div>`).join("");

 return markUp
};

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

 return markUp
};