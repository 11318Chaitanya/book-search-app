import React from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function BookshelfPage({ bookshelf, removeFromBookshelf }) {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col xs:flex-row gap-3 ustify-between align-bottom">
        <h2 className="text-3xl font-bold xs:flex-1">My Bookshelf</h2>
        <div>
          <Link to="/" className="w-fit bg-black px-4 py-2 rounded-md text-white flex items-center">
            Back to Search
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5">
          {bookshelf.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              isOnBookshelf={true}
              onRemove={() => removeFromBookshelf(book)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookshelfPage;
