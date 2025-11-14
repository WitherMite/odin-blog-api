import "dotenv/config";
import Express from "express";
import router from "./routes/router.js";

const PORT = process.env.PORT || 3000;
const app = Express();

app.use(router);

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
