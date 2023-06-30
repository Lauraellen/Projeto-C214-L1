const { TaskModel } = require('../infrastructure/database');

const TaskRepository = {
    async create(data) {
        try {
            const model = new TaskModel(data);
            const response = await model.save();
            return response.toObject();
        } catch (e) {
            return e;
        }
    },
    async update(data) {
        try {
            const update = {
                nome: data.nome,
                dataPrazo: data.dataPrazo,
                status: data.status,
                descricao: data.descricao
            };
            const options = { new: true };
            const filter = { id: data.id };
            const result = await TaskModel.findOneAndUpdate(filter, update, options).exec();
            if (result === null) return []
            return result.toObject();
        } catch (e) {
            return e;
        }
    },
    async list() {
        try {
            const result = await TaskModel.find().exec();
            return result;
        } catch (error) {
            return error;
        }
    },
    async listByDate(data) {
        try {
            const result = await TaskModel.findOne({ dataPrazo: data.dataPrazo }).exec();
            return result;
        } catch (error) {
            return error;
        }
    },
    async delete(data) {
        try {
            const result = await TaskModel.deleteOne({ id: data.id }).exec();
            return result.deletedCount;
        } catch (error) {
            return error;
        }
    },
};

module.exports = TaskRepository;