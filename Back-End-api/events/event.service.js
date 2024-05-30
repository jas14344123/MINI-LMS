const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const events = await db.Event.findAll();
    return events.map(x => basicDetails(x));
}

async function getById(id) {
    const event = await getEvent(id);
    return basicDetails(event);
}

async function create(params) {
    console.log('Creating event with params:', params);
    const event = new db.Event(params);

    // save event
    await event.save();
    return basicDetails(event);
}


async function update(id, params) {
    const event = await getEvent(id);

    // copy params to event and save
    Object.assign(event, params);
    event.updated = Date.now();
    await event.save();

    return basicDetails(event);
}


async function _delete(id) {
    const event = await getEvent(id);
    await event.destroy();
}

// helper functions

async function getEvent(id) {
    const event = await db.Event.findByPk(id);
    if (!event) throw 'event not found';
    return event;
}

function basicDetails(event) {
    const { id, eventDate, eventDescription } = event;
    return { id, eventDate, eventDescription };
}
