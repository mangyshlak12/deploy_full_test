import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-message">No books in the library yet. Add one to get started!</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            {book.isbn && <p className="isbn">ISBN: {book.isbn}</p>}
            {book.publishedYear && <p className="year">Published: {book.publishedYear}</p>}
          </div>
          <div className="book-actions">
            <button
              className="btn btn-edit"
              onClick={() => onEdit(book)}
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                  onDelete(book.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;

