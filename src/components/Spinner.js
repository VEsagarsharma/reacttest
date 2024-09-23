import React, { Component } from 'react'
import spinner from '../assets/images/spinner.png';

export class Spinner extends Component {
  render() {
    return (
        <div className="text-center">
            <img src={spinner} alt='spinner' style={{ width: '100px' }} />
        </div>
    )
  }
}

export default Spinner
