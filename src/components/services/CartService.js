import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api/books';

class booksService {
  getbooks() {
    return axios.get(BASE_URL);
  }

  addItem(item) {
    return axios.post(BASE_URL, item);
  }

  updateItem(id, item) {
    return axios.put(`${BASE_URL}/${id}`, item);
  }

  deleteItem(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }

  clearCart() {
    return axios.delete(BASE_URL);
  }
}

export default new booksService();
