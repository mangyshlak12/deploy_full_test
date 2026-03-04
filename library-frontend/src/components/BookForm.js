import React, { useState, useEffect } from 'react';

function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        publishedYear: book.publishedYear || ''
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      alert('Title and Author are required');
      return;
    }

    const bookData = {
      ...formData,
      publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : null
    };

    if (book) {
      onSubmit(book.id, bookData);
    } else {
      onSubmit(bookData);
    }

    // Reset form if adding new book
    if (!book) {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publishedYear: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="publishedYear">Published Year</label>
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          min="1000"
          max="2100"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;

