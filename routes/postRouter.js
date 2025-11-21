import { Router } from "express";
import posts from "../controllers/posts.js";
import comments from "../controllers/comments.js";

const router = Router();

// posts
router.get(["/", "/:postId"], posts.get);
router.post("/", posts.post);
router.put("/:postId", posts.put);
router.delete("/:postId", posts.del);

// comments
router.get("/:postId/comments", comments.get);
router.post("/:postId/comments", comments.post);
router.put("/:postId/comments/:commentId", comments.put);
router.delete("/:postId/comments/:commentId", comments.del);

export default router;
