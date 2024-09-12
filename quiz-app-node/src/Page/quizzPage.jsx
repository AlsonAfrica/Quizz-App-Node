import React, { useState, useEffect } from 'react';



const QuizComponent = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeOver, setTimeOver] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeOver(false); // Reset time over status
  };

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      alert(`Quiz over! Your score: ${score}`);
      // You can add logic to redirect to another page or show results here
    }
  }, [currentQuestionIndex]);

  return (
    <div>
      {currentQuestionIndex < questions.length && (
        <>
          <Timer duration={30} onTimeUp={() => setTimeOver(true)} />
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeOver={timeOver}
          />
        </>
      )}
    </div>
  );
};

export default QuizComponent;



