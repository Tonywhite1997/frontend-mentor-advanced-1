import PropTypes from "prop-types"
import { useState } from "react"
import Box from "../UI/SqareBox"
import IconArcade from "../assets/images/icon-arcade.svg"
import IconAdvanced from "../assets/images/icon-advanced.svg"
import IconPro from "../assets/images/icon-pro.svg"

Plan.propTypes = {
        billingDuration: PropTypes.any,
        setBillingDuration: PropTypes.any,
        setSummary: PropTypes.func,
        summary: PropTypes.any
    }

function Plan({billingDuration, setBillingDuration, setSummary, summary}) {

    const plans = {
        monthly: [
            {icon: IconArcade, title: "Arcade", price: 9}, 
            {icon: IconAdvanced, title: "Advanced", price: 12},
            {icon: IconPro, title: "Pro", price: 15},
    ],
        yearly: [
            {icon: IconArcade, title: "Arcade", price: 90, discount: 2}, 
            {icon: IconAdvanced, title: "Advanced", price: 120, discount: 2},
            {icon: IconPro, title: "Pro", price: 150, discount: 2},
        ]
    }

    const [selectedPlan, setSelectedPlan] = useState(null)

    function changeSelectedPlan(key){
        setSelectedPlan(key)
         if(summary?.finalPlan?.price === key){
            return setSummary({finalPlan: null, selectedAddOns: null})
        }
    
        if(billingDuration === "monthly"){
            plans.monthly.map((item)=>{
               
                if(item.price === key){
                    setSummary((prevData)=>{
                        return {...prevData, selectedAddOns: null, finalPlan:{title: item.title, price: item.price}}
                    })
                }
            })
        }else{
            plans.yearly.map((item)=>{
                if(item.price === key){
                    setSummary((prevData)=>{
                       return {...prevData, selectedAddOns: [], finalPlan:{title: item.title, price: item.price, discount: item.discount}}
                    })
                }
            })
        }
    }

    function changeBilling(){
        setSummary({finalPlan: null, selectedAddOns: null})
        setBillingDuration((prev)=>{
            return prev === "monthly"? "yearly" : "monthly"
        })
    }
  return (
    <div className="plan">
        <h1>Select Your Plan</h1>
        <p className="description">You have the option of monthly or yearly billing.</p>
        <div className="plans-container">
            {billingDuration === "monthly" && plans.monthly.map((item)=>{
                return <Box key={item.price} {...item} selectedPlan={selectedPlan} changeSelectedPlan={changeSelectedPlan} summary={summary} billingDuration={billingDuration}/>
            })}
            {billingDuration === "yearly" && plans.yearly.map((item)=>{
                return <Box key={item.price} {...item} selectedPlan={selectedPlan} changeSelectedPlan={changeSelectedPlan} summary={summary} billingDuration={billingDuration}/>
            })}
        </div>
        <div className="plan-selector">
            <p style={{color: billingDuration === "monthly"? "hsl(213, 96%, 18%)" : "hsl(231, 11%, 63%)"}}>Monthly</p>

            <div className={billingDuration === "monthly"? "plan-slider monthly" : "plan-slider yearly"} onClick={changeBilling}></div>

            <p style={{color: billingDuration === "yearly"? "hsl(213, 96%, 18%)" : "hsl(231, 11%, 63%)"}}>Yearly</p>
        </div>
    </div>
  )
}

export default Plan
