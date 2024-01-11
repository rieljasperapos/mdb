import express from 'express'
import * as userControllers from '../controllers/userController';

const router = express.Router();

router.get("/users", userControllers.getUsers);
router.post("/add-user", userControllers.addUser);

export = router;