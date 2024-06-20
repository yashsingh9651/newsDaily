import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching News for user
export const fetchNews = createAsyncThunk(
  "fetchNews",
  async ({ category, currentPage }) => {
    if (category === "general") {
      const response = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&lang=eng&articlesPage=${currentPage}&articlesSortBy=date&apiKey=a57989a2-197b-4bf5-93ea-01e7eac60c39`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&keyword=${category}&keywordOper=or&lang=eng&articlesPage=${currentPage}&articlesSortBy=date&includeArticleConcepts=true&includeArticleCategories=true&apiKey=a57989a2-197b-4bf5-93ea-01e7eac60c39`
      );
      return response.data;
    }
  }
);
// Fetching News by Category
export const newsByCategory = createAsyncThunk(
  "newsByCategory",
  async (category) => {
    const response = await axios.get(
      `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&keyword=${category}&keywordOper=or&lang=eng&articlesSortBy=date&includeArticleConcepts=true&includeArticleCategories=true&apiKey=a57989a2-197b-4bf5-93ea-01e7eac60c39`
    );
    return response.data;
  }
);
// Fetching pages of articles by Category
export const newsByCategoryWithPage = createAsyncThunk(
  "newsByCategoryWithPage",
  async ({ category, page }) => {
    if (category === "general") {
      const response = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&lang=eng&articlesPage=${page}&articlesSortBy=date&apiKey=a57989a2-197b-4bf5-93ea-01e7eac60c39`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&keyword=${category}&keywordOper=or&lang=eng&articlesPage=${page}&articlesSortBy=date&includeArticleConcepts=true&includeArticleCategories=true&apiKey=a57989a2-197b-4bf5-93ea-01e7eac60c39`
      );
      return response.data;
    }
  }
);

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState: {
    news: [],
    pages: 0,
    currentPage: 0,
    loading: true,
    category: "general",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload.articles.results;
        state.pages = action.payload.articles.pages;
        state.loading = false;
      })
      .addCase(newsByCategory.fulfilled, (state, action) => {
        state.news = action.payload.articles.results;
        state.pages = action.payload.articles.pages;
        state.loading = false;
      })
      .addCase(newsByCategoryWithPage.fulfilled, (state, action) => {
        state.news = action.payload.articles.results;
        state.pages = action.payload.articles.pages;
        state.loading = false;
      });
  },
});
export const { setCategory,setCurrentPage } = newsSlice.actions;
