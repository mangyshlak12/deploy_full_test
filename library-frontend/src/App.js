import React, { useState, useEffect } from 'react';
import { bookAPI } from './api';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './index.css';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAllBooks();
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend is running on port 8080.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book) => {
    try {
      await bookAPI.createBook(book);
      fetchBooks();
    } catch (err) {
      setError('Failed to add book');
      console.error('Error adding book:', err);
    }
  };

  const handleUpdateBook = async (id, book) => {
    try {
      await bookAPI.updateBook(id, book);
      fetchBooks();
      setEditingBook(null);
    } catch (err) {
      setError('Failed to update book');
      console.error('Error updating book:', err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await bookAPI.deleteBook(id);
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Library Management System</h1>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="container">
        <div className="form-section">
          <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={editingBook ? handleCancelEdit : null}
          />
        </div>

        <div className="list-section">
          <h2>Book Collection</h2>
          {loading ? (
            <p>Loading books...</p>
          ) : (
            <BookList
              books={books}
              onEdit={handleEdit}
              onDelete={handleDeleteBook}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

