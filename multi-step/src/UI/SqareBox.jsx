import propTypes from "prop-types"

SquareBox.propTypes = {
  icon: propTypes.any,
  title: propTypes.any,
  price: propTypes.number,
  discount: propTypes.number,
  billingDuration: propTypes.any,
  selectedPlan: propTypes.any,
  changeSelectedPlan: propTypes.func,
  summary: propTypes.any,
}

function SquareBox({icon, title, price, billingDuration,discount, changeSelectedPlan, summary}) {
// console.log(summary);
  let boxStyle;

  if(billingDuration === "monthly" && !summary?.finalPlan?.discount && title === summary?.finalPlan?.title){
    boxStyle = {
      border: "1px solid hsl(243, 100%, 62%)"
    }
  }
  if(billingDuration === "yearly" && summary?.finalPlan?.discount && title === summary?.finalPlan?.title){
    boxStyle = {
      border: "1px solid hsl(243, 100%, 62%)"
    }
  }

  if(!summary.finalPlan){
    boxStyle = {
      border: "1px solid hsl(229, 24%, 87%)"
    }
  }

  return (
    <div className="box" style={boxStyle} onClick={()=>changeSelectedPlan(price)}>
        <img src={icon} alt="some icon about current plan"/>
        <div>
            <h5>{title}</h5>
            {billingDuration === "monthly" && <small>{`$${price}/mo`}</small>}
            {billingDuration === "yearly" && <small>{`$${price}/yr`}</small>}
            {billingDuration === "yearly" && <p>{`${discount} months free`}</p>}
        </div>
      
    </div>
  )
}

export default SquareBox
