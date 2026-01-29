import dotevnv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotevnv.config({
    path: './.env'
});

const startserver =async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("Error connecting to server:", error);
            throw error;
    });
         app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port :
                ${process.env.PORT}`);

         });
  
}catch (error) {
        console.log("MongoDB connection failed", error);
    }
    }

    startserver();