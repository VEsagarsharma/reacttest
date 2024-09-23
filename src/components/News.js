import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
  
  capitalizeFirstLetter = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loader: false,
      page: 1,
      nextbtn: false
    }

    document.title = this.capitalizeFirstLetter(this.props.category)+ " News Monkey";
  }

  // this function will call after render
  async componentDidMount(){
    this.setState({
      page: 1
    })
    this.updateNews();
  }

  async updateNews(){
    this.setState({loader : true});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&cateogry=${this.props.category}&apiKey=8c3bf132bbc24ebbaa6018e4e57a91f3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      totalResults: parsedData.totalResults,
      loader : false
    })
  }

  handleNextClick = async ()=>{
      this.setState({
        page: this.state.page + 1
      })
      this.updateNews();
  }

  handlePrevClick = async ()=>{
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>News headline</h1>
        <div className="row">
          {this.state.loader && <Spinner /> }
          
          {!this.state.loader  && this.state.articles.map((element)=>{
              return element.title!=='[Removed]' && <div className='col-md-4 my-3' key={element.url}>
              <NewsItem title={element.title} newsUrl={element.url} description={element.description} imageUrl={element.urlToImage} author={element.author}  date={element.publishedAt} />
            </div>
          })}
     
        </div>
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}


export default News