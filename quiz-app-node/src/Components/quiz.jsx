import React, { useState, useEffect } from 'react';
import Timer from '../Components/timer';
import Question from '../Components/questions';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    // Fetch quiz questions from the API
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswer = (selectedOption) => {
    // Handle answer submission and move to the next question
    const isCorrect = questions[currentQuestionIndex].options.find(o => o.text === selectedOption)?.isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeOver(false); // Reset time over status

    if (currentQuestionIndex === questions.length - 1) {
      // Submit answers when quiz is complete
      const answers = questions.map(q => ({
        questionId: q.id,
        selectedOption: selectedOption // You may want to track selected options per question
      }));

      fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
        .then(response => response.json())
        .then(data => alert(`Quiz over! Your score: ${data.score}`))
        .catch(error => console.error("Error submitting answers:", error));
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div>
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

