const router = require('express').Router();
const events = require('../controllers/events');
const locations = require('../controllers/locations');
// const secureRoute = require('../lib/secureRoute');


router.route('/events')
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .delete(events.delete);

router.route('/locations')
  .get(locations.index);




router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
