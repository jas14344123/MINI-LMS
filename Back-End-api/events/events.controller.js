const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const eventService = require('./event.service');

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);
router.post('/', createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    eventService.getAll()
        .then(events => res.json(events))
        .catch(next);
}

function getById(req, res, next) {
    eventService.getById(req.params.id)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        eventDate: Joi.date().required(),
        eventDescription: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    console.log('Received request to create event:', req.body);
    eventService.create(req.body)
        .then(event => res.json(event))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schema = Joi.object({
        eventDate: Joi.date().empty(''),
        eventDescription: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    eventService.update(req.params.id, req.body)
        .then(event => res.json(event))
        .catch(next);
}


function _delete(req, res, next) {
    eventService.delete(req.params.id)
        .then(() => res.json({ message: 'event deleted successfully' }))
        .catch(next);
}
