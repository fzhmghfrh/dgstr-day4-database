// const loadEnv = require('./config/env');
// const express = require('express');
// const connectDB = require('./db/mongodb');
// const { initializePassport } = require('./middleware/passport-jwt');
// const router = require('./routers/router');

// const PORT = 7000;
// const app = express();

// app.use(express.json());
// connectDB();
// app.use(initializePassport());
// app.use('./digistar', router);

// app.use((err, req, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const loadEnv = require('./config/env');
const express = require('express');
const connectDB = require('./db/mongodb');
const userRouter = require('./routers/userRoutes.js'); // Import user routes

// Load environment variables
loadEnv();

const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000
const app = express();

app.use(express.json());
connectDB(); // Connect to MongoDB
app.use('/users', userRouter); // Use the user routes

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
