import React from 'react'
import './index.scss'
export default class Progress extends React.Component {
  render(){
    return (
      <div className='progress'>
        <div className='progress-active'></div>
      </div>
    )
  }
}