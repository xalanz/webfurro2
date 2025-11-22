import axios from 'axios';

// Ajusta esta URL si tu backend corre en otro puerto (8080/9090/etc.)
const BASE_URL = 'http://localhost:9090/api/products';

class ProductService {
  getProducts() {
    return axios.get(BASE_URL);
  }

  getProductById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  createProduct(product) {
    return axios.post(BASE_URL, product);
  }

  updateProduct(id, product) {
    return axios.put(`${BASE_URL}/${id}`, product);
  }

  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
 getCart() {
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
}


export default new ProductService();
