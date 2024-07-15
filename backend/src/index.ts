import connectDB from "./db";
import express from 'express';
import cors from 'cors';
import globalRouter from "./routes/global-router";
import { schedule } from 'node-cron';
import { parsePages } from "./scraper";

connectDB();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// const BASE_URL = "http://localhost:3000";

const BASE_URL = "https://news-tok.vercel.app"

app.use(cors({
    origin: BASE_URL,
    credentials: true
}));

app.use(express.json());

app.use('/api', globalRouter);

// parsePages();

// schedule('*/10 * * * *', () => {
//     console.log('Running the cron job every 3 hours');
//     parsePages();
// });

// schedule.scheduleJob('*/10 * * * *', () => {
//     console.log('Running the cron job every 10 minutes');
//     parsePages();
// });

app.listen(5000, () => {
    console.log(`Server running at ${BASE_URL}`);
    // parsePages();
});

