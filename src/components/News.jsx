// Dynamic Page. This page will show the news article when clicked on the news card.
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const News = () => {
  const { newsId } = useParams();
  const news = useSelector((state) => state.newsSlice.news);
  const article = news.filter((article) => article.uri === newsId)[0];
  return (
    <div className="lg:w-2/3 p-3 lg:p-0 mx-auto flex flex-col lg:gap-5 gap-2 pb-8">
      <h1 className="lg:text-3xl text-xl font-bold mt-3">{article?.title}</h1>
      <img
        src={article?.image}
        alt={article?.title}
        className="lg:w-10/12 md:w-4/5 mx-auto lg:rounded rounded-sm lg:h-96 h-52 md:h-72 object-fill"
      />
      {/* article source info */}
      <div>
          <a
            href={`https://${article?.source?.uri}`}
            target="_blank"
            rel="noreferrer"
            className="font-bold underline"
          >
            By:{article?.source?.title}
          </a>
          <h1 className="text-gray-600">{article?.date}</h1>
          <a rel="noreferrer" target="_blank" className="font-bold underline" href={article?.url}>Original News</a>
      </div>
      <p className="md:text-lg">{article?.body}</p>
    </div>
  );
};

export default News;
