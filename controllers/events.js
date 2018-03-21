const Event = require('../models/event');

// Make commments and images restful

function indexRoute(req, res, next) {
  Event.find().sort('date')
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
    .populate('comments.user')
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

function createCommentRoute(req,res,next) {
  Event.findById(req.params.id)
    .then(event => {
      const comment = { content: req.body.content, event: event.id };
      event.comments.push(comment);
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => {
      const comment = event.comments.id(req.params.commentId);
      comment.remove();
      return event.save();
    })
    .then(event => res.json(event))
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
