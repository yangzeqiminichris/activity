import React from 'react'
import './index.scss'
import koiActivityAreaBottom from "@/assets/koi/koi_activity_area_head.png";
import koiRulePopupTitle from '@/assets/koi/koi_rule_popup_title.png'
import koiRulePopupClose from '@/assets/koi/koi_rule_popup_close.png'

 const Mask = (TargetComponnet) => {
   return class extends React.PureComponent {
     constructor (props) {
       super(props)
     }

     componentDidMount() {
       this.stopBodyScroll(false)
     }

     render(){
       return (
         <div className='popup'>
           <TargetComponnet closePopup={ this.closePopup } {...this.props} />
         </div>
       )
     }

     topDistance = 0

     stopBodyScroll (isFixed) {
       var bodyEl = document.body
       if (isFixed) {
         this.top1 = window.scrollY
         bodyEl.style.position = 'fixed'
         bodyEl.style.top = -this.topDistance + 'px'
       } else {
         bodyEl.style.position = ''
         bodyEl.style.top = ''
         window.scrollTo(0, this.topDistance) // 回到原先的top
       }
     }

     closePopup = () => {
       this.stopBodyScroll(false)
     }
   }
}

export default Mask;