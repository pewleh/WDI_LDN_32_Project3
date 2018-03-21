const Place = require('../models/place');


function indexRoute(req, res, next) {
  Place.find()
    .then(places => res.json(places))
    .catch(next);
}

function createRoute(req, res, next) {
  Place.create(req.body)
    .then(places => res.status(201).json(places))
    .catch(next);
}

function showRoute(req, res, next) {
  Place.findById(req.params.id)
    .populate('comments.user')
    .then(place => res.json(place))
    .catch(next);
}

function updateRoute(req, res, next) {
  Place.findById(req.params.id)
    .then(place => Object.assign(place, req.body))
    .then(place => place.save())
    .then(place => res.json(place))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Place.findById(req.params.id)
    .then(place => place.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function createCommentRoute(req,res,next) {
  Place.findById(req.params.id)
    .then(place => {
      const comment = { content: req.body.content, place: place.id };
      place.comments.push(comment);
      return place.save();
    })
    .then(place => res.json(place))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Place.findById(req.params.id)
    .then(place => {
      const comment = place.comments.id(req.params.commentId);
      comment.remove();
      return place.save();
    })
    .then(place => res.json(place))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
