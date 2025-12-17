import { Router } from "express";
import { postValidator, commentValidator } from "../controllers/validators.js";
import { authenticate } from "../controllers/authentication.js";
import posts from "../controllers/posts.js";
import comments from "../controllers/comments.js";

const router = Router();

// posts
router.get(["/", "/:postId"], postValidator.get, posts.get);
router.post("/", authenticate, postValidator.post, posts.post);
router.put("/:postId", authenticate, postValidator.put, posts.put);
router.delete("/:postId", authenticate, postValidator.del, posts.del);

// comments
router.get("/:postId/comments", commentValidator.get, comments.get);
router.post(
  "/:postId/comments",
  authenticate,
  commentValidator.post,
  comments.post
);
router.put(
  "/:postId/comments/:commentId",
  authenticate,
  commentValidator.put,
  comments.put
);
router.delete(
  "/:postId/comments/:commentId",
  authenticate,
  commentValidator.del,
  comments.del
);

export default router;
