import React from 'react';

const Question = ({ question, onAnswer, timeOver }) => {
  const handleAnswerClick = (isCorrect) => {
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option.isCorrect)}
          disabled={timeOver}
        >
          {option.text}
        </button>
      ))}
      {timeOver && <p>Time is up! Moving to the next question...</p>}
    </div>
  );
};

export default Question;
