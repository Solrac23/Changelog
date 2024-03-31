import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer.js'

import authMiddleware from'./middleware/authMiddleware.js'
import adminMiddleware from'./middleware/adminMiddleware.js'
import changeLogController from'./controllers/ChangeLogController.js'
import labelController from './controllers/LabelController.js'
import categoriesController from './controllers/CategoriesController.js'
import userController from'./controllers/UserController.js'
import authController from'./controllers/AuthController.js'
import passwordController from'./controllers/PasswordController.js'

const router = Router()

router.get('/changelog/:id', authMiddleware, changeLogController.index)
router.get('/changelog', authMiddleware, changeLogController.show)
router.post('/changelog', 
	authMiddleware, 
	adminMiddleware, 
	multer(multerConfig).single('file'), 
	changeLogController.execute)
router.put('/changelog/:id', authMiddleware, adminMiddleware, changeLogController.update)
router.delete('/changelog/:id/image/:imageId', authMiddleware, adminMiddleware, changeLogController.destroy)

router.get('/label/list', authMiddleware, labelController.listLabel)
router.post('/label', authMiddleware, adminMiddleware, labelController.createLabel)
router.put('/label/:labelId', authMiddleware, adminMiddleware, labelController.editLabel)

router.get('/categories/category/list', 
	authMiddleware, 
	categoriesController.listCotegories)
router.post('/categories', authMiddleware, adminMiddleware, categoriesController.createCategories)
router.put('/categories/:categorieId/category/:categoryId', 
	authMiddleware, 
	adminMiddleware, 
	categoriesController.editCategories)

router.patch('/forgetpassword', passwordController.changePassword)

router.get('/user/list', authMiddleware, adminMiddleware, userController.userList)
router.get('/user', authMiddleware, userController.show)
router.post('/user', userController.store)
router.patch('/user', authMiddleware, userController.updated)
router.delete('/user/:userId', authMiddleware, adminMiddleware, userController.deleteUser)

router.post('/auth/login', authController.authenticate)

export default router
