import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";

const SearchPage = ({ isBookOnBookshelf, addToBookshelf, removeFromBookshelf, }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedFetchDataRef = useRef();

  const fetchData = async (searchQuery) => {
    setData([]);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`
      );
      setData(response.data.docs);
      console.log(response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    debouncedFetchDataRef.current = debounce(fetchData, 500);
  }, []);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchDataRef.current(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold">Search Book</h1>
      <div className="mt-4 flex flex-col gap-3 xs:flex-row">
        <input
          type="text"
          className="border border-1 border-gray-400 rounded-md p-2 outline-purple-black xs:flex-1"
          placeholder="Search for a book..."
          value={query}
          onChange={handleQueryChange}
        />
        <Link
          to="/bookshelf"
          className="w-fit xs:w-auto bg-black px-4 py-2 rounded-md text-white flex items-center"
        >
          My Bookshelf
        </Link>
      </div>
      <div className="mt-5">
        {loading && <Spinner />}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5">
          {data &&
            data.map((book, index) =>
              book.title &&
              book.title !== "_undefined" &&
              book.title !== "undefined" ? (
                <BookCard
                  key={index}
                  book={book}
                  isOnBookshelf={isBookOnBookshelf(book)}
                  onAdd={addToBookshelf}
                  onRemove={removeFromBookshelf}
                />
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
