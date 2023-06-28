const Task = require('../application/task_service');
const Utils = require('../utils/utils');

const route = '/task';

module.exports = (app) => {
    app.post(`${route}/create`, async (req, res) => {
        const response = await Task.create(req.body);
        res.status(Utils.responseStatus(response.name));
        res.json(response);
    });
    app.put(`${route}/update`, async (req, res) => {
        const response = await Task.update(req.body);
        res.status(Utils.responseStatus(response.name));
        res.json(response);
    });
    app.get(`${route}/list`, async (req, res) => {
        const response = await Task.list();
        res.status(Utils.responseStatus(response.name));
        res.json(response);
    });
    app.patch(`${route}/listTask`, async (req, res) => {
        const response = await Task.listByDate(req.body);
        res.status(Utils.responseStatus(response.name));
        res.json(response);
    });
    app.delete(`${route}/delete/:id`, async (req, res) => {
        const data = req.body;
        const { id } = req.params;
        data.id = id;
        const response = await Task.delete(data);
        res.status(Utils.responseStatus(response.name));
        res.json(response);
    });
};