import React,{Component} from 'react'
import moment from 'moment'
import './index.scss'

export default class CountDown extends Component{
    state = {
        lastMS:new Date('2019/11/01 15:00').getTime() - new Date().getTime()
    }

    timeInterval = null
    componentDidMount(){
        this.timeInterval = setInterval(() => {
            this.setState({ lastMS:new Date('2019/11/01 15:00').getTime() - new Date().getTime()})
        },1000)
    }

    getSecond = () =>{
        let ss = moment.duration(this.state.lastMS).seconds()
        console.log(ss)
        if(String(ss).length == 1){
            return '0'+ss
        }
        return ss
    }
    getMin = () =>{
        let mm = moment.duration(this.state.lastMS).minutes()
        if(String(mm).length == 1){
            return '0'+mm
        }
        return mm
    }
    getH = () =>{
        let HH = moment.duration(this.state.lastMS).hours()
        if(String(HH).length == 1){
            return '0'+HH
        }
        return HH
    }



    render(){
        const {lastMS} = this.state
        console.log(this.state)
        const hours = this.getH()
        const min = this.getMin()
        const seconds = this.getSecond()
        return (<div className='cd-content'>
            <div className='cd-box'>
                <div className='cd-box-header'>距离活动开始还有</div>
                <div className='cd-box-time'>
                    <div>
                    <span className='cd-time'>{hours}</span>
                    <span className='cd-text'>时</span>
                    <span className='cd-time'>{min}</span>
                    <span className='cd-text'>分</span>
                    <span className='cd-time'>{seconds}</span>
                    <span className='cd-text'>秒</span>
                    </div>
                </div>
            </div>
            <div className='cd-tip'>
                <div>活动还没正式开始呢，</div>
                <div>请稍后再来查看吧！((๑•̀ㅂ•́)و✧)</div>
            </div>
        </div>)
    }
}