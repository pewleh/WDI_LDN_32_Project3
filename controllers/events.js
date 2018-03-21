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
    .populate('comments.userId')
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

<<<<<<< HEAD
function imageCreateRoute(req, res, next) {
  console.log(req.body);
  Event.findById(req.params.id)
    .then(event => {
      event.userImages.push(req.body);
=======
function createCommentRoute(req,res,next) {
  Event.findById(req.params.id)
    .then(event => {
      const comment = { content: req.body.content, event: event.id, userId: req.body.userId };
      event.comments.push(comment);
>>>>>>> development
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

<<<<<<< HEAD
=======
function deleteCommentRoute(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => {
      const comment = event.comments.id(req.params.commentId);
      comment.remove();
      event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

>>>>>>> development
module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
<<<<<<< HEAD
  imageCreate: imageCreateRoute
=======
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
>>>>>>> development
};
