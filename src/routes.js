const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const authMiddleware = require('./middleware/authMiddleware')
const adminMiddleware = require('./middleware/adminMiddleware')
const changeLogController = require('./controllers/ChangeLogController')
const userController = require('./controllers/UserController')
const authController = require('./controllers/AuthController')
const profileController = require('./controllers/ProfileController')
const passwordController = require('./controllers/PasswordController')

const router = Router()

// Move to page login 
router.get('/', (req, res) => {
	return res.redirect('/auth/login')
})

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
		version: Joi.string().regex(/\d{2}.\d{2}.\d{2}/).required(),
		date: Joi.date().required(),
		description: Joi.string().required(),
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
		version: Joi.string().regex(/\d{2}.\d{2}.\d{2}/),
		date: Joi.date(),
		description: Joi.string(),
		major_changes: Joi.string(),
		major_changes_check: Joi.boolean(),
		changed_features: Joi.string(),
		changed_features_check: Joi.boolean(),
		fix: Joi.string(),
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

router.get('/profile', authMiddleware, profileController.show)
router.put('/profile', authMiddleware, celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string().email().regex(/\w+@\w+\.\w+/),
		nameCompany: Joi.string(),
		uf: Joi.string().max(2),
		city: Joi.string(),
	})
}, {
	abortEarly: false,
}), profileController.updated)

router.put('/forgetpassword', passwordController.changePassword)

router.post('/user', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().regex(/\w+@\w+\.\w+/).required(),
		password: Joi.string().min(6).required(),
		role: Joi.string().regex(/USER|ADMIN/),
		nameCompany: Joi.string().required(),
		uf: Joi.string().max(2).required(),
		city: Joi.string().required()
	})
}, {
	abortEarly: false,
}), userController.store)
router.post('/auth/login', authController.authenticate)

module.exports = router
