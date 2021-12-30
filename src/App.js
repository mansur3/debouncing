import {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


  const App = () => {
    
    const [state,setState] = useState("");
    
    const [country, setCountry] = useState([]);
    const handleChange  = (e) => { 
      setState(e.target.value);
    }

    useEffect( async () => {
      if(state.length > 1) {
        const {data} = await axios.get(`http://localhost:3001/country?q=${state}`)
        setCountry(data);
      }
    }, [state])


let subtitle;

    const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


    return (
      <div className="App">
       <div className = "inputContainer">
        <input value = {state} onChange = {(e) => {
          handleChange(e);
        }} type = "text" placeholder = "search the country" />
       </div>
       <div className = "showItem">
        {
          country.map((e, i) => ( 
            <div>
            <div onClick = {openModal} className = "country" key = {i}>
              {e.country}
              </div>
              <div>
       <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Details</h2>
        <button onClick={closeModal}>close</button>
        <div>Country: {e.country}</div>
        <div>City : {e.city}</div>
      </Modal>
       </div>
            </div>
          ))
        }
       </div>
       
      </div>
    );
  };

export default App;
