import dotenv from "dotenv";
import connectDB from "./DB/dbConnection.js";
dotenv.config({ path: "./.env", quiet: true });
import { app } from "./app.js";
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("server is listening");
    const server = app.listen(port, () => {
      console.log(`-> Server is running on http://localhost:${port}`);
    });
    server.on("error", (error) => {
      console.log("Server error:", error);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then(() => {
//       console.log(
//         "database connected successfully with",
//         mongoose.connection.name
//       );
//     });
//     app.on("error", (error) => {
//       console.log("Err :- ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`APP is Listening on ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("error while connecting with database ", error);
//   }
// })();
