import propTypes from "prop-types"
import { useState, useEffect } from "react"
import RectBox from "../UI/RectBox"


AddOns.propTypes = {
    billingDuration: propTypes.any,
    setSummary: propTypes.func,
    summary: propTypes.any,
}

function AddOns({billingDuration, setSummary, summary}) {
    
  // CREATING THE ADD-ONS OPTIONS 

    const addOns = {
        monthly: [
            {title: "Online service", description: "Access to multiplayer games", price: 1, selected: false},

            {title: "Larger storage", description: "Extra 1TB cloud save", price: 2, selected: false},

            {title: "Customizable profile", description: "Custom theme on your profile", price: 2, selected: false}
        ],

        yearly: [
            {title: "Online service", description: "Access to multiplayer games", price: 10, selected: false},

            {title: "Larger storage", description: "Extra 1TB cloud save", price: 10, selected: false},

            {title: "Customizable profile", description: "Custom theme on your profile", price: 20, selected: false}
        ]
    }

    const [addOnData, setAddOnData] = useState(addOns)

    //MODIFYING ADDONDATA IF THERE IS SUMMARY DATA. THEN UPDATE THE ADDONDATA THAT MACTHES THE TITLE IN THE SUMMARY.SELECTED ADDONS.

    useEffect(()=>{
      if(summary.finalPlan && summary?.selectedAddOns?.length){
        if(summary.finalPlan.discount){
          setAddOnData((prevData)=>{
            return {...prevData, 
              yearly: prevData.yearly.map((item)=>{
                const matchingData = summary.selectedAddOns.find((addOnItem)=>{
                  return addOnItem.title === item.title  
                })
                return matchingData? {...item, selected: true} : item
              })
            }
          })
        }else{
          setAddOnData((prevData)=>{
            return {...prevData, 
              monthly: prevData.monthly.map((item)=>{
                const matchingData = summary.selectedAddOns.find((addOnItem)=>{
                  return addOnItem.title === item.title
                })
                return matchingData ? {...item, selected: true} : item
              })
            }
          })
        }
        
      }
      
    },[summary])

    //PICKING AN ADD-ON OPTION

    function pickAddOn(key){
      setAddOnData((prevData)=>{
        if(billingDuration === "monthly"){
          const updatedMonthly = prevData.monthly.map((item)=>{
            if(key === item.title){
              return {...item, selected: !item.selected}
            }

            setSummary((prev)=>{
                return {...prev, selectedAddOns: updatedMonthly.filter((addon)=>{
                  if(addon.selected){
                    return {title: addon.title, price: addon.price}
                  }
                })}
              })
            
            return item
          })
          return {...prevData, monthly: updatedMonthly}
        }else{
          const updatedYearly = prevData.yearly.map((item)=>{
            if(key === item.title){
              return {...item, selected: !item.selected}
            }

            setSummary((prev)=>{
              return {...prev, selectedAddOns: updatedYearly.filter((addon)=>{
                if(addon.selected){
                  return {title: addon.title, price: addon.price}
                }
              })}
            })
            return item
          })
          return {...prevData, yearly: updatedYearly}
        }
      })
    }

    // PUTTING ALL THE EXTRA PROPS NEEDED IN ADD-ONS COMPONENT IN OBJECT 

    const addonExtraProps = {
      billingDuration,
      summary
    }

  return (
    <div className="add-ons">
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>
      <div className="add-ons-container">
        {summary?.finalPlan?.discount ? addOnData?.yearly?.map((item)=>{
             return <RectBox key={item.title} {...item} {...addonExtraProps} changeAddOnData={()=>pickAddOn(item.title)} addOnData={addOnData}/>
        }) : addOnData?.monthly?.map((item)=>{
             return <RectBox key={item.title} {...item} {...addonExtraProps} changeAddOnData={()=>pickAddOn(item.title)} addOnData={addOnData}/>
        })} 
      </div>
    </div>
  )
}

export default AddOns