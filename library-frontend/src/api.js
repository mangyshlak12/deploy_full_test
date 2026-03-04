import axios from 'axios';

const API_BASE_URL = '/api/books';

export const bookAPI = {
  getAllBooks: () => axios.get(API_BASE_URL),
  getBookById: (id) => axios.get(`${API_BASE_URL}/${id}`),
  createBook: (book) => axios.post(API_BASE_URL, book),
  updateBook: (id, book) => axios.put(`${API_BASE_URL}/${id}`, book),
  deleteBook: (id) => axios.delete(`${API_BASE_URL}/${id}`)
};

