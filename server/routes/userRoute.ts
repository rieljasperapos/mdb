import express from 'express'
import * as userControllers from '../controllers/userController';

const router = express.Router();

router.get("/users", userControllers.authenticate, userControllers.getUsers);
router.post("/register-user", userControllers.registerUser);
router.post("/login-user", userControllers.loginUser);

export = router;