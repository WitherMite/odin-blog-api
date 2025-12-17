import { Router } from "express";
import { loginValidator } from "../controllers/validators.js";
import { login } from "../controllers/authentication.js";

const router = Router();

router.get("/", loginValidator, login);

export default router;
