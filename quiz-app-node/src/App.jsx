import React, { useState, useEffect } from 'react';
import QuizComponent from './Components/quiz';// Adjust the path if needed
import './App.css';

// Sample questions for the quiz
const questions = [
  {
    text: 'What is 2 + 2?',
    options: [
      { text: '3', isCorrect: false },
      { text: '4', isCorrect: true },
      { text: '5', isCorrect: false },
    ],
  },
  {
    text: 'What is the capital of France?',
    options: [
      { text: 'Berlin', isCorrect: false },
      { text: 'Madrid', isCorrect: false },
      { text: 'Paris', isCorrect: true },
    ],
  },
  // Add more questions as needed
];

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetch('http://localhost:5000/api/message') // Fetch the message from the backend
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error("Error fetching the message:", error);
        setError('Failed to fetch message'); // Set error state
      });
  }, []);

  return (
    <div className="App">
      <h1>Message from Backend:</h1>
      {error ? <p className="error">{error}</p> : <p>{message}</p>}
      <h2>Quiz Time</h2>
      <div className="quiz-container">
        <QuizComponent questions={questions} />
      </div>
    </div>
  );
}

export default App;

