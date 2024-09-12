import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'


function App() {
  const [message, setMessage] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/message')  // Should match the backend's port
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error("Error fetching the message:", error));
 }, []);
 

  return (
    <>
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </>
  )
}

export default App
