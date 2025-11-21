import { Router } from "express";
import users from "../controllers/users.js";

const router = Router();

router.get("/:userId", users.get);
router.post("/", users.post);
router.put("/:userId", users.put);
router.delete("/:userId", users.del);

export default router;
