import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BookshelfPage from './pages/BookshelfPage';

function App() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(savedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(
      (book) => book.key !== bookToRemove.key
    );
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  const isBookOnBookshelf = (book) => {
    return bookshelf.some((b) => b.key === book.key);
  };
  return (
    <Router>
      <div className="md:container m-auto p-3 md:px-12">
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                isBookOnBookshelf={isBookOnBookshelf}
                addToBookshelf={addToBookshelf}
                removeFromBookshelf={removeFromBookshelf}
              />
            }
          />
          <Route
            path="/bookshelf"
            element={
              <BookshelfPage
                bookshelf={bookshelf}
                removeFromBookshelf={removeFromBookshelf}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
