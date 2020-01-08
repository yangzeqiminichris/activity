import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import btnImg from '@/assets/introduction_btn.png'
import './index.scss'


const headerImg = 'http://static.zbszkj.com/images/%E6%94%BE%E5%BF%83%E6%B6%88%E8%B4%B9%E9%A1%B5%E9%9D%A2%E9%95%BF%E5%85%B4.jpg'
const headerImg2 = 'http://static.zbszkj.com/images/%E6%94%BE%E5%BF%83%E6%B6%88%E8%B4%B9%E9%A1%B5%E9%9D%A2%E6%B5%99%E5%8C%97.jpg'
const homeImg = 'http://static.zbszkj.com/images/home.png'

export default class ActivityA extends React.Component {
  state = {
    id: this.props.match.params.id,
    btnShow: false
  }

  componentDidMount() {
    console.log(this.props.match)
    window.addEventListener('scroll', this.onScroll, true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  // 点击tabs
  scrollTo = index => {
    // 滚动到 锚点
    let tabHeight = document.getElementsByClassName('introduction-href')[index].offsetTop
    const btnHeight = document.getElementsByClassName('introduction-btns')[0].clientHeight
    scroll.scrollTo(tabHeight - btnHeight)
  }

  onScroll = e => {
    const btnOffsetTop = document.getElementsByClassName('introduction-btns')[0].offsetTop
    const height = window.scrollY
    const { btnShow } = this.state
    // 270
    if (height > btnOffsetTop && !btnShow) {
      this.setState({ btnShow: true })
    } else if (height < btnOffsetTop && btnShow) {
      this.setState({ btnShow: false })
    }
  }

  toHome = () => {
    window.wx.miniProgram.switchTab({
      url: '/pages/mall/index'
    })
  }

  render() {
    const { btnShow } = this.state
    return (
      <div className='introduction' ref={a => (this.content = a)}>
        <img className='introduction-img' src={this.state.id == 1 ? headerImg : headerImg2} />
        <div className={`scroll-box ${btnShow ? '' : 'disabled'}`}>
          <img className='scroll-btn' src={btnImg} />
          <div className='scroll-btns'>
            <div onClick={() => this.scrollTo(0)}>1</div>
            <div onClick={() => this.scrollTo(1)}>2</div>
            <div onClick={() => this.scrollTo(2)}>3</div>
            <div onClick={() => this.scrollTo(3)}>4</div>
          </div>
        </div>
        <div className='introduction-btns'>
          <div onClick={() => this.scrollTo(0)}>1</div>
          <div onClick={() => this.scrollTo(1)}>2</div>
          <div onClick={() => this.scrollTo(2)}>3</div>
          <div onClick={() => this.scrollTo(3)}>4</div>
        </div>
        <div className='introduction-href introduction-1'>1</div>
        <div className='introduction-href introduction-2'>2</div>
        <div className='introduction-href introduction-3'>3</div>
        <div className='introduction-href introduction-4'>4</div>
        <div className='introduction-back' onClick={this.toHome}>
          <img src={homeImg} />
        </div>
      </div>
    )
  }
}
