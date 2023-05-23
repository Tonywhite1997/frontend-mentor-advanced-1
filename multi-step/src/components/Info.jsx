import propTypes from "prop-types"

Info.propTypes = {
  setUserData: propTypes.func,
  name: propTypes.string,
  email: propTypes.string,
  phone: propTypes.number,
  isNextStep: propTypes.bool,
  setIsNextStep: propTypes.func,
  isValidEmail: propTypes.bool
}

function Info({setUserData, name, phone, email, isNextStep, setIsNextStep, isValidEmail}) {

  function collectUserData(e){
    e.preventDefault()
    // console.log(name);
    setUserData((prevData)=>{
      let {name, value} = e.target
      if(prevData.name && prevData.email && prevData.phone){
        setIsNextStep(false)
      }
      return {...prevData, [name]: value}
  })

  }
  return (
    <div className="info">
        <h1>Personal Info</h1>
        <p>Please provide your name, email address and phone number</p>
        <form className="form">
          <div className="form-div">
            <div className="label-div">
              <label>Name</label>
            {isNextStep && !name && <small>This field is required</small>}
            </div>
            <input style={{border: isNextStep && !name && "1px solid red"}} placeholder="Vannessa Bryant" value={name} name="name"
            onChange={collectUserData}
            />
          </div>
          <div className="form-div">
              <div className="label-div">
                <label>Email Address</label>
                {isNextStep && !email && <small>This field is required</small>}
                {isNextStep && email && !isValidEmail && <small>invalid Email</small>}
              </div>
            <input style={{border: isNextStep && !email && "1px solid red"}} type="email" placeholder="Vannessa@" value={email} name="email"
            onChange={collectUserData}
            />
          </div>
          <div className="form-div">
            <div className="label-div">
              <label>Phone Number</label>
              {isNextStep &&  !phone && <small>This field is required</small>}
            </div>
            <input style={{border: isNextStep && !phone && "1px solid red"}} type="number" placeholder="Vannessa Bryant" value={phone} name="phone"
            onChange={(e)=>{collectUserData(e)}}
            />
          </div>
        </form>
    </div>
  )
}

export default Info
