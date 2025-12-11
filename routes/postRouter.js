import { Router } from "express";
import { postValidator, commentValidator } from "../controllers/validators.js";
import posts from "../controllers/posts.js";
import comments from "../controllers/comments.js";

const router = Router();

// posts
router.get(["/", "/:postId"], postValidator.get, posts.get);
router.post("/", postValidator.post, posts.post);
router.put("/:postId", postValidator.put, posts.put);
router.delete("/:postId", postValidator.del, posts.del);

// comments
router.get("/:postId/comments", commentValidator.get, comments.get);
router.post("/:postId/comments", commentValidator.post, comments.post);
router.put("/:postId/comments/:commentId", commentValidator.put, comments.put);
router.delete(
  "/:postId/comments/:commentId",
  commentValidator.del,
  comments.del
);

export default router;
