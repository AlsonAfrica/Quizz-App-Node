import React, { useState, useEffect } from 'react';
import Timer from '../Components/timer';
import Question from '../Components/questions';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);  // Store quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Track current question
  const [score, setScore] = useState(0);  // Track quiz score
  const [timeOver, setTimeOver] = useState(false);  // Track if time is over
  const [selectedAnswers, setSelectedAnswers] = useState([]);  // Track selected answers

  // Fetch quiz questions from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  // Handle answer submission
  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(o => o.text === selectedOption)?.isCorrect;

    // Update the score if the answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Save the selected answer
    setSelectedAnswers([...selectedAnswers, { questionId: currentQuestion.id, selectedOption }]);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeOver(false);  // Reset the timer
    } else {
      // If quiz is complete, submit answers to the server
      const answers = selectedAnswers;

      fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
        .then(response => response.json())
        .then(data => {
          alert(`Quiz over! Your final score is: ${data.score}`);
        })
        .catch(error => console.error("Error submitting answers:", error));
    }
  };

  // Render loading message if questions are still being fetched
  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      {/* If quiz isn't over, display the current question */}
      {currentQuestionIndex < questions.length ? (
        <>
          <Timer duration={30} onTimeUp={() => setTimeOver(true)} />
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeOver={timeOver}
          />
        </>
      ) : (
        <p>Quiz over! Your final score is: {score}</p>
      )}
    </div>
  );
};

export default QuizComponent;

