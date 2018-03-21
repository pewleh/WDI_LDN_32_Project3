const router = require('express').Router();

const events = require('../controllers/events');
const places = require('../controllers/places');
const users = require('../controllers/users');

const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');


router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create);

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);

router.route('/events/:id/images')
  .post(events.imageCreate);

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment);

router.route('/events/:eventId/comments/:commentId')
  .delete(secureRoute, events.deleteComment);


router.route('/places')
  .get(places.index)
  .post(secureRoute, places.create);

router.route('/places/:id')
  .get(places.show)
  .put(secureRoute, places.update)
  .delete(secureRoute, places.delete);

router.route('/places/:id/comments')
  .post(secureRoute, places.createComment);

router.route('/places/:placeId/comments/:commentId')
  .delete(secureRoute, places.deleteComment);


router.post('/register', auth.register);

router.post('/login', auth.login);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
