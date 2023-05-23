import propTypes from "prop-types";

RectBox.propTypes = {
  title: propTypes.any,
  description: propTypes.any,
  price: propTypes.number,
  billingDuration: propTypes.any,
  pickAddOn: propTypes.any,
  selected: propTypes.bool,
  changeAddOnData: propTypes.func,
  summary: propTypes.any,
  addOnData: propTypes.any
};

function RectBox({ title, description, price, changeAddOnData, summary, selected}) {

  return (
    <div className="rect-box" style={{backgroundColor: selected=== true && "hsl(217, 100%, 97%)", 
    border: selected=== true && "1px solid hsl(243, 100%, 62%)"}}>
      <div className="rect-box-left">
        <input type="checkbox" checked={selected} onChange={changeAddOnData}/>
        <div className="text-container">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    {!summary?.finalPlan?.discount && <small>{`+$${price}/mo`}</small>}
    {summary?.finalPlan?.discount && <small>{`+$${price}/yr`}</small>}
    </div>
  );
}


export default RectBox;
