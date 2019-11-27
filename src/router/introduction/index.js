import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import headerImg from '@/assets/放心消费页面长兴.jpg'
import headerImg2 from '@/assets/安吉、南浔、湖州 放心消费.jpg'
import btnImg from '@/assets/introduction_btn.png'
import './index.scss'

export default class ActivityA extends React.Component {
  state = {
    id: this.props.match.params.id,
    btnShow: false
  }

  componentDidMount() {
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

  render() {
    const { btnShow } = this.state
    return (
      <div className='introduction' ref={a => (this.content = a)}>
        <img className='introduction-img' src={this.state.id == 1 ? headerImg : headerImg2} />
        {btnShow && (
          <div className='scroll-box'>
            <img className='scroll-btn' src={btnImg} />
            <div className='scroll-btns'>
              <div onClick={() => this.scrollTo(0)}>1</div>
              <div onClick={() => this.scrollTo(1)}>2</div>
              <div onClick={() => this.scrollTo(2)}>3</div>
              <div onClick={() => this.scrollTo(3)}>4</div>
            </div>
          </div>
        )}
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
      </div>
    )
  }
}
