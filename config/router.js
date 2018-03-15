const router = require('express').Router();
const events = require('../controllers/events');
// const secureRoute = require('../lib/secureRoute');


router.route('/events')
  .get(events.index);
  // .post(secureRoute, events.create);

// router.route('/events/:id')
//   .get(events.show)
//   .put(secureRoute, events.update)
//   .delete(secureRoute, events.delete);




router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
