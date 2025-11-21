import "dotenv/config";
import Express from "express";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

const PORT = process.env.PORT || 3000;
const app = Express();

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
