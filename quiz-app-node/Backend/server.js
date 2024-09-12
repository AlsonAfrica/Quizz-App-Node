const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows the React app to communicate with this server
app.use(express.json()); // Allows parsing of JSON bodies

// Sample questions (you can replace this with a database or a more dynamic source)
const questions = [
  {
    id: 1,
    text: 'What is 2 + 2?',
    options: [
      { text: '3', isCorrect: false },
      { text: '4', isCorrect: true },
      { text: '5', isCorrect: false },
    ],
  },
  {
    id: 2,
    text: 'What is the capital of France?',
    options: [
      { text: 'Berlin', isCorrect: false },
      { text: 'Madrid', isCorrect: false },
      { text: 'Paris', isCorrect: true },
    ],
  },
  // Add more questions as needed
];

// A simple API route
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

// Endpoint to get all quiz questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Endpoint to submit answers and get the score
app.post('/api/submit', (req, res) => {
    const { answers } = req.body; // Expects an array of { questionId: number, selectedOption: string }
    let score = 0;

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        const option = question.options.find(o => o.text === answer.selectedOption);

        if (option && option.isCorrect) {
            score += 1;
        }
    });

    res.json({ score });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
