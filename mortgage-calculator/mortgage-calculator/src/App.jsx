import { useState } from 'react'
import './App.css'

function App() {
  const [propertyValue, setPropertyValue] = useState("");
  const [deposit,setDeposit] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState(false);

  const handleChange = (e, setter) => {
    const input = e.target.value;
    if (input === "" || (/^\d*$/.test(input) && Number(input) >= 0)) {
      setter(input);
  }
  }

  const calculatRresults = () => {
    const loan = Number(propertyValue) - Number(deposit);
    const years = Number(term);
    const rates = {10: 0.035, 15: 0.04, 20: 0.045}
    const interestRate = rates[term] || 0;

    const monthlyRate = interestRate / 12;
    const months = years * 12;

    const monthlyPayment =
      (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: (monthlyPayment * months).toFixed(2),
      totalInterest: (monthlyPayment * months - loan).toFixed(2),
    }
  }

  const results = calculatRresults();
  

  return (
    <div className='app'>
      {!result ? (
        <div className='card'>
          <head>
            <title>Mortgage Calculater</title>
          </head>
          <h1>Mortgage Calculater</h1>

          <label>Property Value(GBP)</label>
          <input
            type = "text"
            value = {propertyValue}
            onChange = {(e) => handleChange(e, setPropertyValue)}
            placeholder = "You can input an approximate amount"
          />

          <label>Deposit(GBP)</label>
          <input
            type = "text"
            value = {deposit}
            onChange = {(e) => handleChange(e, setDeposit)}
            placeholder = "You can input an approximate amount"
          />

          <label>Mortgage Term(years)</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)}>
            <option value="">Please select</option>
            <option value="10">10(rate: 3.5%)</option>
            <option value="15">15(rate: 4%)</option>
            <option value="20">20(rate: 4.5%)</option>
          </select>

          <div>
            <button className='btn' onClick={() => setResult(true)}>
              CALCULATE
            </button>
          </div>
        </div>
      ) : (
        <div className='card'>
          <head>
            <title>Results</title>
          </head>
          <h1>Results</h1>
          <p>
            <b>Monthly Payment:</b> £{results.monthlyPayment}
          </p>
          <p>
            <b>Total Interest:</b> £{results.totalInterest}
          </p>
          <p>
            <b>Total Payment:</b> £{results.totalPayment}
          </p>

          <div className='btn-group'>
            <button className='btn'>
              See how much you can borrow
            </button>
           <button className='btn secondary' onClick={() => setResult(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
