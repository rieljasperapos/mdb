import express from 'express'
import * as authenticateController from '../controllers/authenticate'
import * as userController from '../controllers/userController'

const router = express.Router();

router.get("/auth", userController.authenticate, authenticateController.getAuthenticate)
router.get("/logout", authenticateController.destroyAuthenticate);

export = router;