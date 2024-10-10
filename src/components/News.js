import React, { useState, useEffect, useRef } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

  const {
    country = 'in',
    pageSize = 20,
    category = 'general'
  } = props;

 const [articles,setArticles] = useState([]);
 const [loader,setLoader] = useState(true);
 const [page,setPage] = useState(1);
 const [totalResults,setTotalresult] = useState(0);

  // Ref to track the initial load
  const firstRender = useRef(true);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    // props.setProgress(0);
    
    
 
  // this function will call after render
 

  useEffect(()=>{
    document.title = capitalizeFirstLetter(props.category) + " News Monkey";
    if (firstRender.current) {
      updateNews();
      firstRender.current = false; // Set to false after the first execution
    }
  },[]);


  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&cateogry=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setLoader(false);
    setTotalresult(parsedData.totalResults);
    
    props.setProgress(100);  
  }

  
  const fetchMoreData = async () => {
    props.setProgress(0);
    // Use a function to update the page state based on the previous value
    //setPage(prevPage => prevPage + 1);

  // Ensure that the updated page value is used after setting the state
     // let nextPage = page + 1;  // Calculate the next page manually

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&cateogry=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
    setLoader(false);
    setTotalresult(parsedData.totalResults);
    props.setProgress(100);  
  };
    return (
      <>
        <h1>News headline</h1>
       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return element.title !== '[Removed]' && <div className='col-md-4 my-3' key={element.url}>
                  <NewsItem title={element.title} newsUrl={element.url} description={element.description} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        </>
    )
  }



News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News