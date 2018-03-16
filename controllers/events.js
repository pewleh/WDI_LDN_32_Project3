const Event = require('../models/event');
const { secret } = require('../config/environment');

function indexRoute(req, res, next) {
  Event.find()
    .then(events => res.json(events))
    .catch(next);
}

function createRoute(req, res, next){
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(next);
}

function updateRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => Object.assign(event, req.body))
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => event.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

console.log(secret);

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
