import './App.css';
import { useEffect, useState } from 'react';
import { api } from './API';

function App() {

  const [contact, setContact] = useState("")
  const [opt, selectOption] = useState("F") 
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState("")
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [pincode, selectedPincode] = useState("")
  const [IsSuccessful, setSuccess] = useState(false)

  useEffect(() => {
    api.getStates()
       .then((response)=>{
         const listOfstates = response.data.states;
         console.log(listOfstates)
         setStates(listOfstates)
       })
       .catch((error) => {
         console.log(error)
       })
    setSelectedState("1")
  }, [])

  useEffect(() => {
    api.getDistrict(selectedState)
       .then((response) => {
          const listOfdistricts = response.data.districts;
          console.log(listOfdistricts)
          setDistricts(listOfdistricts)
       })
       .catch((error) => {
         console.log(error)
       })
  }, [selectedState])
  
  return (
    <div className="container">
      <div className="header">
        <h1>Covid Vaccine Registration Assistant</h1>
      </div>
      {
        IsSuccessful ?
        <>
          <h3 className = "message">You will be notified when slots are available </h3>
        </>
        :
        <>
          <input className = "whatsapp" type = "text" placeholder="Whatsapp Number" onChange = { (e) => { setContact(e.target.value) } } />
          <div className="options" onChange = { (e) => { selectOption(e.target.value) } } >
            <input type="radio" name="options" value = "T" /><p> Pincode </p>
            &nbsp;&nbsp;&nbsp;
            <input type="radio" name="options" value = "F" /><p> District </p>
          </div>
          {
          opt==="T" ?
          <div className="pincode">
            <input type="text" placeholder="Pincode" onChange = { (e) => { selectedPincode(e.target.value) } } />
          </div>
          :
          <>
            <div className="state">
              <p>State:</p>
              &nbsp;&nbsp;
              <select value = { selectedState } onChange = { (e) => { setSelectedState(e.target.value) } } >
              {
                states.map((item) => {
                  return <option key = { item.state_id } value = { item.state_id } > { item.state_name } </option>
                })
              }
              </select>
            </div>
            <div className="district">
              <p>District:</p>
              &nbsp;&nbsp;
              <select value = { selectedDistrict } onChange = { (e) => { setSelectedDistrict(e.target.value) } } >
              {
                districts.map((item) => {
                  return <option key = { item.district_id } value = { item.district_id } > { item.district_name } </option>
                })
              }
              </select>
            </div>
          </>
          }
          {
          contact.length === 10 && ( (opt === "T" && pincode.length === 6) || (opt === "F") ) ?
          <button onClick = { () => {
            api.storeData(contact, pincode, selectedDistrict)
            setSuccess(!IsSuccessful);
          } }
          className = "btn"
          > Submit </button>
          :
          <button className = "btn" disabled >Submit</button>
          }
          <div className="steps">
            <ul>
              <li>Enter your whatsapp number, on which you want to recieve notifications.</li>
              <li>Either enter your pincode or select your state and district</li>
              <li>Click Submit</li>
              <li>You will recieve a notification message on your provided Whatsapp number</li>
            </ul>
          </div>
        </>
      }
      <div className="footer">
        <h3>Developed By - Abhinav Srivastava</h3>
      </div>
    </div>
  );
}

export default App;
