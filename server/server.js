import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const term = '4650';
const dataPath = '../app/data/';

app.get(['/', '/about', '/faq', '/bug', '/contact', '/tos'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

app.get('/data/search', (req, res) => {
    const prepared = [];

    const schoolsData = require(`${dataPath}${term}/schools.json`);
    schoolsData.forEach((school) => {
        const subjectsData = require(`${dataPath}${term}/${school.id}/subjects.json`);
        subjectsData.forEach((subject) => {
            const coursesData = require(`${dataPath}${term}/${school.id}/${subject.abbv}/courses.json`);
            coursesData.forEach((course) => {
                prepared.push({
                    text: `${course.subject} ${course.abbv} ${course.name}`,
                    value: `${course.subject} ${course.abbv} ${course.name}`,
                    school: course.school,
                    subject: course.subject,
                    course: course.abbv
                });
            });
        });
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(prepared));
});

app.get('/data/schools', (req, res) => {
    const result = require(`${dataPath}${term}/schools.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/subjects/:school', (req, res) => {
    const result = require(`${dataPath}${term}/${req.params.school}/subjects.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/courses/:school/:subject', (req, res) => {
    const result = require(`${dataPath}${term}/${req.params.school}/${req.params.subject}/courses.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/sections/:school/:subject/:course', (req, res) => {
    const result = require(`${dataPath}${term}/${req.params.school}/${req.params.subject}/${req.params.course}/sections.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/data/details/:school/:subject/:course/:section', (req, res) => {
    const result = require(`${dataPath}${term}/${req.params.school}/${req.params.subject}/${req.params.course}/${req.params.section}/details.json`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});
