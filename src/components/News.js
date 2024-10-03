import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loader: true,
      page: 1,
      nextbtn: false,
      totalResults:0,
      apiCall: true
    }
    this.props.setProgress(0);

    document.title = this.capitalizeFirstLetter(this.props.category) + " News Monkey";
  }

  // this function will call after render
  async componentDidMount() {
    if(this.state.apiCall === true){
      this.updateNews();
    }
  }


  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&cateogry=${this.props.category}&apiKey=8c3bf132bbc24ebbaa6018e4e57a91f3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loader: false
    })
    this.props.setProgress(100);  
  }

  
  fetchMoreData = async () => {
    this.props.setProgress(0);
    this.setState(prevState => ({
        page: prevState.page + 1
      }), async () => {  
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&cateogry=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loader: false
      })
    this.props.setProgress(100);  
    });
  };

  
  componentWillUnmount = () => {
    this.state = {
      apiCall :false
    }
  }
  
  render() {
    return (
      <>
        <h1>News headline</h1>
       
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
}


export default News