import propTypes from "prop-types"

Summary.propTypes = {
    summary: propTypes.any,
    onChangeStep: propTypes.func
}

function Summary({summary, onChangeStep}) {
  let total = summary?.finalPlan?.price

  summary?.selectedAddOns?.map((item)=>{
    return total += item.price
  })

  return (
    <div className="summary">
      <h1>Finishing up</h1>
      <p className="description">Double-check everything looks OK before confirming.</p>
      <div className="summary-container">
        <div className="summary-plan">
            {!summary?.finalPlan?.discount && <h5>{`${summary?.finalPlan?.title} (Monthly)`}</h5>}
            {summary?.finalPlan?.discount && <h5>{`${summary?.finalPlan?.title} (Yearly)`}</h5>}
            
            {!summary?.finalPlan?.discount && <small>{`$${summary?.finalPlan?.price}/mo`}</small>}

            {summary?.finalPlan?.discount && <small>{`$${summary?.finalPlan?.price}/yr`}</small>}
        </div>
        <p className="change-plan" onClick={()=>{onChangeStep(2)}}>change</p>
        <hr/>
      {summary?.selectedAddOns?.map((item)=>{
        return <div key={item.title} className="add-on-container"> 
        <p className="plan-title">{item.title}</p>
        {summary?.finalPlan?.discount && <small className="plan-price">{`+$${item.price}/yr`}</small>}
        {!summary?.finalPlan?.discount && <small className="plan-price">{`+$${item.price}/mo`}</small>}
        </div>
      })}
      </div>
      <div className="total-price">
        {summary?.finalPlan.discount && <p>Total (per year)</p>}
        {!summary?.finalPlan.discount && <p>Total (per month)</p>}
        {summary?.finalPlan.discount && <small>{`+$${total}/yr`}</small>}
        {!summary?.finalPlan.discount && <small>{`+$${total}/mo`}</small>}
      </div>
    </div>
  )
}

export default Summary
