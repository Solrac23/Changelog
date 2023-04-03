const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const authMiddleware = require('./middleware/authMiddleware')
const adminMiddleware = require('./middleware/adminMiddleware')
const ChangeLogController = require('./controllers/ChangeLogController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const router = Router()

const changeLogController = ChangeLogController
const userController = UserController
const authController = AuthController

router.get('/changelog/:id', authMiddleware, celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required()
	}),

}, {
	abortEarly: false,
}), changeLogController.index)
router.get('/changelog', authMiddleware, changeLogController.show)
router.post('/changelog', authMiddleware, adminMiddleware, celebrate({
	[Segments.BODY]: Joi.object().keys({
		versao: Joi.string().regex(/\d{2}.\d{2}.\d{2}/).required(),
		date: Joi.date().required(),
		descricao: Joi.string().required(),
		major_changes: Joi.string(),
		major_changes_check: Joi.boolean(),
		changed_features: Joi.string(),
		changed_features_check: Joi.boolean(),
		fix: Joi.string(),
		fix_check: Joi.boolean(),
	})
}, {
	abortEarly: false,
}), changeLogController.execute)
router.put('/changelog/:id', authMiddleware, adminMiddleware, celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	}),
	[Segments.BODY]: Joi.object().keys({
		versao: Joi.string().regex(/\d{2}.\d{2}.\d{2}/).required(),
		date: Joi.date().required(),
		descricao: Joi.string().required(),
		major_changes: Joi.string().required(),
		major_changes_check: Joi.boolean(),
		changed_features: Joi.string().required(),
		changed_features_check: Joi.boolean(),
		fix: Joi.string().required(),
		fix_check: Joi.boolean(),
	})
}, {
	abortEarly: false,
}), changeLogController.update)
router.delete('/changelog/:id', authMiddleware, adminMiddleware, celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	}),
}, {
	abortEarly: false,
}), changeLogController.destroy)

router.post('/user', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		role: Joi.boolean().default(false).required(),
		nameCompany: Joi.string().required(),
		uf: Joi.string().max(2).required(),
		city: Joi.string().required()
	})
}, {
	abortEarly: false,
}), userController.store)
router.post('/login', authController.authenticate)

module.exports = router
