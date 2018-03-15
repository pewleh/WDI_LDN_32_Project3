const router = require('express').Router();
const events = require('../controllers/events');
// const secureRoute = require('../lib/secureRoute');


router.route('/events')
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .delete(events.delete);




router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
