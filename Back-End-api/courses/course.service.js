const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const courses = await db.Course.findAll();
    return courses.map(x => basicDetails(x));
}

async function getById(id) {
    const course = await getCourse(id);
    return basicDetails(course);
}

async function create(params) {
    const course = new db.Course(params);

    // save course
    await course.save();
    return basicDetails(course);
}

async function update(id, params) {
    const course = await getCourse(id);

    // copy params to course and save
    Object.assign(course, params);
    course.updated = Date.now();
    await course.save();

    return basicDetails(course);
}


async function _delete(id) {
    const course = await getCourse(id);
    await course.destroy();
}

// helper functions

async function getCourse(id) {
    const course = await db.Course.findByPk(id);
    if (!course) throw 'course not found';
    return course;
}

function basicDetails(course) {
    const { id, title, description, duration } = course;
    return { id, title, description, duration };
}
