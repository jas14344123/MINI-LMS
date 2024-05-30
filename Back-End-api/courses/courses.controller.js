const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const courseService = require('./course.service');

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);
router.post('/', createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    courseService.getAll()
        .then(courses => res.json(courses))
        .catch(next);
}

function getById(req, res, next) {
    courseService.getById(req.params.id)
        .then(course => course ? res.json(course) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    courseService.create(req.body)
        .then(course => res.json(course))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        description: Joi.string().empty(''),
        duration: Joi.number().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    courseService.update(req.params.id, req.body)
        .then(course => res.json(course))
        .catch(next);
}


function _delete(req, res, next) {
    courseService.delete(req.params.id)
        .then(() => res.json({ message: 'course deleted successfully' }))
        .catch(next);
}
