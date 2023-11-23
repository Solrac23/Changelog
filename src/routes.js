import { Router } from 'express'
import authMiddleware from'./middleware/authMiddleware.js'
import adminMiddleware from'./middleware/adminMiddleware.js'
import changeLogController from'./controllers/ChangeLogController.js'
import userController from'./controllers/UserController.js'
import authController from'./controllers/AuthController.js'
import profileController from'./controllers/ProfileController.js'
import passwordController from'./controllers/PasswordController.js'

const router = Router()

router.get('/changelog/:id', authMiddleware, changeLogController.index)
router.get('/changelog', authMiddleware, changeLogController.show)
router.post('/changelog', authMiddleware, adminMiddleware, changeLogController.execute)
router.put('/changelog/:id', authMiddleware, adminMiddleware, changeLogController.update)
router.delete('/changelog/:id', authMiddleware, adminMiddleware, changeLogController.destroy)

router.get('/profile', authMiddleware, profileController.show)
router.put('/profile', authMiddleware, profileController.updated)

router.put('/forgetpassword', passwordController.changePassword)

router.post('/user', userController.store)

router.post('/auth/login', authController.authenticate)

export default router
