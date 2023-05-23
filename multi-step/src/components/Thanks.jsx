import CheckMark from "../assets/images/icon-thank-you.svg"

function Thanks() {
  return (
    <section className="thanks-page">
        <div className="check-logo">
            <img src={CheckMark} alt="thank you" />
        </div>
      <h2>Thank you!</h2>
      <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </section>
  )
}

export default Thanks
