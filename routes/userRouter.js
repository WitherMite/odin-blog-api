import { Router } from "express";
import { userValidator } from "../controllers/validators.js";
import users from "../controllers/users.js";

const router = Router();

router.get("/:userId", userValidator.get, users.get);
router.post("/", userValidator.post, users.post);
router.put("/:userId", userValidator.put, users.put);
router.delete("/:userId", userValidator.del, users.del);

export default router;
