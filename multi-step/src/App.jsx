import { useState } from "react"
import Info from "./components/Info"
import Plan from "./components/Plan"
import AddOns from "./components/Add-ons"
import Summary from "./components/Summary"
import Thanks from "./components/Thanks"

function App() {
  const [step, setStep] = useState(1)

  const [summary, setSummary] = useState({finalPlan: null, selectedAddOns: null})

   const [billingDuration, setBillingDuration] = useState("monthly")

   const [userData, setUserData] = useState({name: "", email:"", phone: ""})

   const [isNextStep, setIsNextStep] = useState(false)

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const isValidEmail = emailRegex.test(userData.email)

  function nextStep(){
    setIsNextStep(true)
    const {name, phone} = userData
    if(step === 1 && !name.length || !phone.length || !isValidEmail){
      return
    } 
    if(step === 2 && !summary.finalPlan){
      return
    }
    setStep((prevStep) => prevStep + 1)
  }
  function prevStep(){
    if(step === 1){
      return
    }
    setStep((prevStep) => prevStep - 1)
  }

  return (
    <main className="main">
      <section>
      <div className="main-steps">
        <div className="step">
          <div className="step-num" style={{backgroundColor: step === 1 && "hsl(206, 94%, 87%)", color:step === 1 && "black"}}>1</div>
          <div>
            <small>STEP 1</small>
            <p>YOUR INFO</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num" style={{backgroundColor: step === 2 && "hsl(206, 94%, 87%)", color:step === 2 && "black"}}>2</div>
          <div>
            <small>STEP 2</small>
            <p>SELECT PLAN</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num" style={{backgroundColor: step === 3 && "hsl(206, 94%, 87%)", color:step === 3 && "black"}}>3</div>
          <div>
            <small>STEP 3</small>
            <p>ADD-ONS</p>
          </div>
        </div>
        <div className="step">
          <div className="step-num" style={{backgroundColor: step >= 4 && "hsl(206, 94%, 87%)", color:step === 4 && "black"}}>4</div>
          <div>
            <small>STEP 4</small>
            <p>SUMMARY</p>
          </div>
        </div>
      </div>
      {<div className="main-contents-container">
        <div className="main-contents">
        
          {step === 1 && <Info setUserData={setUserData} {...userData} isNextStep={isNextStep} setIsNextStep={setIsNextStep} isValidEmail = {isValidEmail}/>}
          {step === 2 && <Plan billingDuration={billingDuration} setBillingDuration={setBillingDuration} setSummary={setSummary} summary={summary}/>}
          {step === 3 && <AddOns billingDuration={billingDuration} setSummary={setSummary} summary={summary}/>}
          {step===4 && <Summary summary={summary} onChangeStep={setStep}/>}

          {step > 4 && <Thanks />}

        </div>
        {step <= 4 && <div className="buttons" style={{justifyContent: step === 1 ? "flex-end" : "space-between"}}>
          {step !== 1 && <button className="back-button" onClick={prevStep}>Go Back</button>}
          <button onClick={nextStep} style={{backgroundColor: step === 2 && !summary.finalPlan && "gray" ||  step === 4 && "hsl(243, 100%, 62%)"}}>{step !== 4? "Next Step" : "Confirm"}</button>
        </div>}
      </div>}
      </section>
    </main>
  )
}

export default App
