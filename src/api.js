import axios from "axios";
import { textQuery } from "./index";
axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.headers.common["x-api-key"] = "39130911-8039e4f23f6b3aae8a4a0d71c";

    BAS_URL ="https://pixabay.com/api/";
    API_KEY = "39130911-8039e4f23f6b3aae8a4a0d71c";



const params = new URLSearchParams({
        key: "API_KEY",
        q: "textQuery",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
      });
console.dir(params);

export async function fetchList(textQuery) {
    try {
      const response = await axios.get(`${ BAS_URL }?${ params }`);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }
    