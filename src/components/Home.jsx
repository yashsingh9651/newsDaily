import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchNews,
  newsByCategory,
  newsByCategoryWithPage,
  setCategory,
  setCurrentPage,
} from "../redux/newsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const pages = [1, 2, 3, 4, 5, 6, 7];
  const categories = [
    "general",
    "cricket",
    "bussiness",
    "automobiles",
    "tech",
    "health",
    "politics",
  ];
  const news = useSelector((state) => state.newsSlice.news);
  const pagesCount = useSelector((state) => state.newsSlice.pages);
  const currentPage = useSelector((state) => state.newsSlice.currentPage);
  const category = useSelector((state) => state.newsSlice.category);
  const loading = useSelector((state) => state.newsSlice.loading);
  // Scrolling To top of the window on another page of the news list
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    dispatch(fetchNews({category,currentPage}));
  }, []);
  return (
    <>
      {/* Mapping Categories Button for small devices */}
      <div className="flex lg:hidden flex-wrap mt-2 justify-center items-center gap-5 text-base font-semibold capitalize px-3">
        {categories.map((category) => {
          return (
            <h1
              className="hover:scale-110 duration-200 bg-gray-300 rounded px-3 py-1 cursor-pointer"
              key={category}
              onClick={() => {
                dispatch(setCategory(category));
                dispatch(newsByCategory(category));
              }}
            >
              {category}
            </h1>
          );
        })}
      </div>
      {/* Heading */}
      <h1 className="capitalize lg:text-2xl text-xl lg:font-bold font-semibold underline underline-offset-4 mt-2 text-center">
        {category} news
      </h1>
      {/* Mapping News Articles */}
      <div className="p-5 grid xl:grid-cols-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center place-items-stretch">
        {loading
          ? // Loading skeleton
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-[230px] lg:w-[270px] bg-gray-200 p-4 rounded-md shadow-md"
              >
                <div className="h-40 rounded-md bg-gray-300"></div>
                <div className="h-6 mt-2 bg-gray-300"></div>
                <div className="h-4 mt-1 bg-gray-300"></div>
                <div className="h-4 mt-1 bg-gray-300"></div>
              </div>
            ))
          : // Rendering news
            news.map((article) => {
              return (
                <div
                  key={article.uri}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <img
                    src={article.image}
                    className="h-40 rounded-md object-conatin w-full"
                    alt="news-image"
                  />
                  <Link to={`/${article.uri}`}>
                    <h1 className="text-base font-semibold my-2">
                      {article.title}
                    </h1>
                    <p>{article.body.slice(0, 150)}...</p>
                  </Link>
                </div>
              );
            })}
      </div>
      {/* Pagination Buttons */}
      {!loading && (
        <footer className="pb-5">
          {pagesCount >= 7 && (
            <div className="flex flex-wrap justify-center items-center gap-3">
              {pages.map((page) => (
                <button
                  key={page}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 duration-150 text-white rounded-md"
                  onClick={() => {
                    dispatch(setCurrentPage(page));
                    dispatch(newsByCategoryWithPage({ category, page }));
                    scrollToTop();
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </footer>
      )}
    </>
  );
};

export default Home;
