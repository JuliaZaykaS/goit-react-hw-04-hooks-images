const BASE_URL = 'https://api.pexels.com/';
const KEY = '563492ad6f917000010000018440f741ec6d4f2f820955cbe8aa670b';
export default class PexelsAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 10;
    }

    // static options = {
    //     method: 'GET',
    //     headers: {
    //         Authorization: KEY,
    //     },
    // }

    fetchImages() {
    //   https://api.pexels.com/v1/search?query=nature&per_page=1"
        const url = `${BASE_URL}v1/search?query=${this.searchQuery}&per_page=${this.perPage}&page=${this.page}`;
        const options = {
         method: 'GET',
         headers: {
             Authorization: KEY,
         },

     };

    return fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Нет изображений по данному запросу ${this.searchQuery}`),
        );
      })
      .then(images => {
        // this.incrementPage();
        return images;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
//   get page() {
//     return this.page;
//   }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
