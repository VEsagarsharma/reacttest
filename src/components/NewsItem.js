import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    
    // this is called destructuring 
    let {title,description,imageUrl,newsUrl,author, date} = this.props;
    return (
        
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="cart-text"><small className='text-muted'>By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_blank' className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
  }
}

export default NewsItem
