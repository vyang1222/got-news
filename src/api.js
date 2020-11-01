import axios from "axios";

const apiKey = "78b9d599c4f94f8fa3afb1a5458928d6";
const url = `https://newsapi.org/v2`;

// fetch articles filtered by request parameters
export const getNews = async (req) => {
  const { country, category, q, page, categories } = req;
  // country's default value is "us," don't need to handle case of country === ""
  // page's default value is 1, and logic is already done to prevent invalid page number
  const qParam = q === "" ? "" : `&q=${q}`;
  if (categories.length === 0) {
    const categoryParam = category === "" ? "" : `&category=${category}`;
    const res = await axios.get(
      `${url}/top-headlines?country=${country}${qParam}${categoryParam}&page=${page}&apiKey=${apiKey}`
    );
    // handle error in frontend
    return res.data;
  }

  // handle error in frontend
  return getSortedNews(country, qParam, page, categories);
};

// constants to work with
const articlesInPage = 20;
const maxPageSize = 100;

// cache results of sorted news per unique search. allows for efficient page indexing
let results = {
  country: "",
  categories: [],
  qParam: "",
  status: "",
  totalResults: "",
  articles: [],
};

const getPage = (page) => {
  return { ...results, articles: results.articles.slice((page - 1) * articlesInPage, page * articlesInPage) };
};

// if user searches for something using search bar, merge results of categories they select
const getSortedNews = async (country, qParam, page, categories) => {
  // decide to fetch and update results or not
  if (
    results.country === country &&
    results.categories.toString() === categories.sort().toString() &&
    results.qParam === qParam
  ) {
    // request only differs in page. simply return the correct page.
    return getPage(page);
  }

  // this is a new request: need to update results and return 1st page. given page will not be used.
  // maximum totalResults I've encountered is 70 for top-headlines endpoint. assume fetched results can fit on 1 page with pageSize=100.
  const res = await axios.get(
    `${url}/top-headlines?country=${country}${qParam}&category=${categories[0]}&pageSize=${maxPageSize}&apiKey=${apiKey}`
  );
  const { data } = res;
  // add rest of categories, if applicable
  for (let i = 1; i < categories.length; i++) {
    const resAdd = await axios.get(
      `${url}/top-headlines?country=${country}${qParam}&category=${categories[i]}&pageSize=${maxPageSize}&apiKey=${apiKey}`
    );
    const dataAdd = resAdd.data;
    // time complexity: O(N), where N is # of articles to add
    for (let j = 0; j < dataAdd.articles.length; j++) {
      data.articles.push(dataAdd.articles[j]);
    }
    // update totalResults and status if necessary
    data.totalResults += dataAdd.totalResults;
    if (dataAdd.status !== "ok") {
      data.status = dataAdd.status;
      data.code = dataAdd.code;
      data.message = dataAdd.message;
      // if error, early return to indicate error
      return data;
    }
  }

  // sort by date (most recently published): O(N^2) if <= 10 articles, else O(NlogN), where N is # of articles to sort through
  data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // update results
  results = {
    ...data,
    country: country,
    categories: categories,
    qParam: qParam,
  };

  // return first page
  return getPage(1);
};
