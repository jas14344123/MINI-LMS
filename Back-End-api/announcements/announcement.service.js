const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const announcements = await db.Announcement.findAll();
    return announcements.map(x => basicDetails(x));
}

async function getById(id) {
    const announcement = await getAnnouncement(id);
    return basicDetails(announcement);
}

async function create(params) {
    const announcement = new db.Announcement(params);

    // save announcement
    await announcement.save();
    return basicDetails(announcement);
}

async function update(id, params) {
    const announcement = await getAnnouncement(id);

    // copy params to announcement and save
    Object.assign(announcement, params);
    announcement.updated = Date.now();
    await announcement.save();

    return basicDetails(announcement);
}


async function _delete(id) {
    const announcement = await getAnnouncement(id);
    await announcement.destroy();
}

// helper functions

async function getAnnouncement(id) {
    const announcement = await db.Announcement.findByPk(id);
    if (!announcement) throw 'announcement not found';
    return announcement;
}

function basicDetails(announcement) {
    const { id, title, content } = announcement;
    return { id, title, content };
}
