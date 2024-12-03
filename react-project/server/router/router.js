import Router from 'express'
import UserController from '../controllers/user-controller.js'
import ProductController from '../controllers/product-controller.js'
import NewsController from '../controllers/news-controller.js'
import FeedbackController from '../controllers/feedback-controller.js'

const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

router.get('/products', ProductController.get)
router.post('/create-product', ProductController.create)
router.put('/update-product', ProductController.update)
router.delete('/delete-product', ProductController.delete)

router.get('/news', NewsController.get)
router.post('/create-news', NewsController.create)

router.get('/feedbacks', FeedbackController.get)
router.post('/create-feedback', FeedbackController.create)

export default router