import React, { useState, useEffect } from 'react';
// import QuizComponent from './components/QuizComponent'; 
import QuizComponent from './Page/quizzPage'; // Import your QuizComponent
import './App.css';  // Import the updated CSS

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

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/message')  // Fetch the message from the backend
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching the message:", error));
  }, []);

  return (
    <div className="App">
      {/* Render the QuizComponent below */}
      <h2>Quiz Time</h2>
      <div className="quiz-container">
        <QuizComponent questions={questions} />
      </div>
    </div>
  );
}

export default App;
