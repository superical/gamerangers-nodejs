const router = require('express').Router()
const auth = require('../../middlewares/authenticate')

const UserController = require('../../controllers/UserController')
const FavouriteController = require('../../controllers/FavouriteController')
const ReviewController = require('../../controllers/ReviewController')

router.get('/', UserController.index)
router.post('/', UserController.create)
router.patch('/:userid', auth.self, UserController.update)
router.delete('/:userid', auth.adminOnly, UserController.remove)

router.get('/:userid/favourites', auth.adminOnly, FavouriteController.viewAllByUserId)

router.get('/:userid/reviews', auth.self, ReviewController.viewByUserId)

router.get('/current', auth.required, UserController.currentUser)
router.get('/current/favourites', auth.required, FavouriteController.viewAllByCurrentUserId)
router.put('/current/favourites/:gameid', auth.required, FavouriteController.createReplaceByCurrentUserIdGameId)
router.delete('/current/favourites/:gameid', auth.required, FavouriteController.removeByCurrentUserId)

module.exports = router