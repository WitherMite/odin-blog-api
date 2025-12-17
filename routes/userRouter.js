import { Router } from "express";
import { userValidator } from "../controllers/validators.js";
import { authenticate } from "../controllers/authentication.js";
import users from "../controllers/users.js";

const router = Router();

router.get("/:userId", userValidator.get, users.get);
router.post("/", userValidator.post, users.post);
router.put("/:userId", authenticate, userValidator.put, users.put);
router.delete("/:userId", authenticate, userValidator.del, users.del);

export default router;
