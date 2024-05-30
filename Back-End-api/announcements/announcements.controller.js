const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const announcementService = require('./announcement.service');

// routes
router.get('/', getAll);
router.get('/:id', authorize(), getById);
router.post('/', createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    announcementService.getAll()
        .then(announcements => res.json(announcements))
        .catch(next);
}

function getById(req, res, next) {
    announcementService.getById(req.params.id)
        .then(announcement => announcement ? res.json(announcement) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    announcementService.create(req.body)
        .then(announcement => res.json(announcement))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        content: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    announcementService.update(req.params.id, req.body)
        .then(announcement => res.json(announcement))
        .catch(next);
}


function _delete(req, res, next) {
    announcementService.delete(req.params.id)
        .then(() => res.json({ message: 'announcement deleted successfully' }))
        .catch(next);
}
