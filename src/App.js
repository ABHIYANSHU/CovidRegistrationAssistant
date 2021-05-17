import './App.css';
import { useState } from 'react';
import { api } from './API';

function App() {

  const [responseData, setResponseData] = useState('')

  const fetchData = (e) => {
    e.preventDefault()
    api.getData()
    .then((response)=>{
        setResponseData(response.data)
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}


  return (
    <>
      <p> Contact No. : </p><input type = "text" />
      <br/>
      <p> Pin Code : </p><input type="text" />
      <br/>
      <p> State : </p>
      <select>
        <option>UP</option>
      </select>
      <p>District : </p>
      <select>
        <option>Varanasi</option>
      </select>
      <button onClick = { fetchData } >States</button>
      { responseData }
    </>
  );
}

export default App;
