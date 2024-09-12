const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows the React app to communicate with this server
app.use(express.json()); // Allows parsing of JSON bodies

// A simple API route
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
