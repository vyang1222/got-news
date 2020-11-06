import axios from "axios";

require("dotenv").config();
const apiKey = process.env.REACT_APP_API_KEY;
const url = `https://newsapi.org/v2`;
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
// cache results of request to sources endpoint.
let cachedSources = "";
// no results: handle case of error code "parametersMissing" when no sources are returned from the sources endpoint
const noResults = {
  status: "",
  totalResults: 0,
  articles: [],
};

const getPage = (page) => {
  return { ...results, articles: results.articles.slice((page - 1) * articlesInPage, page * articlesInPage) };
};

/*
 * fetch articles filtered by request parameters
 */
export const getNews = async (req, endpoint_) => {
  const { country, category, q, page, categories } = req;
  const endpoint = endpoint_ === "top" ? "top-headlines" : "everything";
  // country's default value is "us," don't need to handle case of country === ""
  // page's default value is 1, and logic is already done to prevent invalid page number
  const qParam = q === "" ? "" : `&q=${q}`;
  // 1 category
  if (categories.length === 0) {
    const params = await getParams1(endpoint_, country, category, qParam, page);
    if (params !== "") {
      const res = await axios.get(`${url}/${endpoint}?${params}&apiKey=${apiKey}`);
      // handle error in frontend
      return res.data;
    } else {
      return noResults;
    }
  }

  //
  return getSearchedNews(endpoint_, country, qParam, page, categories);
};

/*
 * if user searches for something using search bar, merge results of categories they select
 */
const getSearchedNews = async (endpoint_, country, qParam, page, categories) => {
  // decide to fetch and update results or not
  const noUpdate =
    results.country === country &&
    results.categories.toString() === categories.sort().toString() &&
    results.qParam === qParam;

  /* --- request only differs in page. simply return the correct page. --- */
  if (noUpdate) {
    if (endpoint_ === "top") {
      return getPage(page);
    } else {
      if (cachedSources === "") {
        return noResults;
      }
      const res = await axios.get(
        `${url}/everything?sources=${cachedSources}${qParam}&page=${page}&sortBy=publishedAt&apiKey=${apiKey}`
      );
      return res.data;
    }
  }

  /* --- deal with everything endpoint --- */
  if (endpoint_ === "all") {
    // gather all sources using sources endpoint and update cachedSources
    let sources = await getAllSources(categories, country);
    cachedSources = sources;
    if (sources === "") {
      return noResults;
    }
    // update results
    results.country = country;
    results.categories = categories;
    results.qParam = qParam;
    // return first page
    const res = await axios.get(
      `${url}/everything?sources=${sources}${qParam}&page=1&sortBy=publishedAt&apiKey=${apiKey}`
    );
    return res.data;
  }

  /* --- deal with top-headlines endpoint --- */

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

/* ------ HELPER METHOD ------ */

// get parameters for requests with 1 category
const getParams1 = async (endpoint_, country, category, qParam, page) => {
  if (endpoint_ === "top") {
    const categoryParam = category === "" ? "" : `&category=${category}`;
    return `country=${country}${qParam}${categoryParam}&page=${page}`;
  } else {
    // first get sources, then pass in that as a parameter into the everything endpoint
    const sources = await getSources(category, country);
    if (sources !== "") {
      return `sources=${sources}${qParam}&page=${page}`;
    } else {
      // no sources, return an empty string to notify that there are no results
      return "";
    }
  }
};

// (only used when accessing everything endpoint) get sources for request of 1 category
const getSources = async (category, country) => {
  const res = await axios.get(`${url}/sources?category=${category}&country=${country}&apiKey=${apiKey}`);
  let sources = "";
  res.data.sources.forEach((source) => {
    sources += source.id + ",";
  });
  return sources;
};

// (only used when accessing everything endpoint and searching for something) get sources for request of 1 or more category
const getAllSources = async (categories, country) => {
  let sources = "";
  for (const category of categories) {
    sources += await getSources(category, country);
  }
  return sources;
};
