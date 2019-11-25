import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import headerImg from '@/assets/放心消费页面长兴.jpg'
import './index.scss'

export default class ActivityA extends React.Component {
  state = {}

  // 点击tabs
  onScroll = index => {
    // antd-mobile无选中背景颜色 配置选中背景色

    // 滚动到 锚点
    let tabHeight = document.getElementsByClassName('introduction-href')[index].offsetTop
    console.log(document.getElementsByClassName('introduction-href'))
    scroll.scrollTo(tabHeight)
  }

  render() {
    return (
      <div className='introduction'>
        <img className='introduction-img' src={headerImg} />
        <div className='introduction-btns'>
          <div onClick={() => this.onScroll(0)}>1</div>
          <div onClick={() => this.onScroll(1)}>2</div>
          <div onClick={() => this.onScroll(2)}>3</div>
          <div onClick={() => this.onScroll(3)}>4</div>
        </div>
        <div className='introduction-href introduction-1'>1</div>
        <div className='introduction-href introduction-2'>2</div>
        <div className='introduction-href introduction-3'>3</div>
        <div className='introduction-href introduction-4'>4</div>
      </div>
    )
  }
}
