// Import express
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store book data (instead of using a database)
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Get all books (Read)
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a single book by ID (Read)
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Add a new book (Create)
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID (Update)
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: bookId,
      title: req.body.title,
      author: req.body.author
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Book not found');
  }
});

// Delete a book by ID (Delete)
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send(); // No content
  } else {
    res.status(404).send('Book not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
