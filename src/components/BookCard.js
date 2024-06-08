import React from "react";

const BookCard = ({ book, isOnBookshelf, onAdd, onRemove }) => {
  return (
    <div className="border p-4 rounded shadow-sm min-h-[200px] flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          {book.title !== "" || book.title !== "_undefined" ? book.title : ""}
        </h3>
        <p>
          By: <span className="italic">{book.author_name}</span>
        </p>
        <p className="text-sm text-gray-600">
          Edition Count: {book.edition_count}
        </p>
      </div>
      <div className="mt-3">
        {!isOnBookshelf ? (
          <button className="inline-flex w-fit bg-green-600 px-4 py-2 rounded-md text-white"  onClick={() => onAdd(book)}>
            Add to Bookshelf
          </button>
        ) : (
          <button className="inline-flex w-fit bg-orange-500 px-4 py-2 rounded-md text-white" onClick={() => onRemove(book)}>
            Remove from Bookshelf
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
