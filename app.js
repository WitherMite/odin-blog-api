import "dotenv/config";
import Express from "express";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import catch404 from "./errorHandlers/catch404.js";
import sendErrorJSON from "./errorHandlers/sendErrorJSON.js";

const PORT = process.env.PORT || 3000;
const app = Express();

app.use(Express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use(catch404);
app.use(sendErrorJSON);

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
