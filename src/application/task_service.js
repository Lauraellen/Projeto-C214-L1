const validate = require('validate.js');

const Utils = require('../utils/utils');
const Constants = require('../utils/constants');
const TaskRepository = require('../port/task_repository');
const Constraints = require('../utils/task_validation');
const Validation = require('../utils/validation');

const Task = {
    async create(data) {
        try {
            const validation = Validation.create(data);
            if (validation) {
                return validation;
            }

            data.id = Utils.generateUuid();

            const response = await TaskRepository.create(data);

            if (response.code === 11000) {
                const result = Constants.ErrorDuplicate;
                return result;
            }
            return response;
        } catch (error) {
            return error;
        }
    },

    async update(data) {
        try {
            const validation = validate.validate(data, Constraints.update);
            if (validation) {
                const response = Constants.ErrorValidation;
                response.message = validation;
                return response;
            }

            const response = await TaskRepository.update(data);

            if (response === []) {
                const result = Constants.ErrorNotFound;
                return result;
            }
            return response;
        } catch (error) {
            return error;
        }
    },

    async delete(data) {
        try {
            const validation = validate.validate(data, Constraints.deleteBy);
            if (validation) {
                const response = Constants.ErrorValidation;
                response.message = validation;
                return response;
            }

            const response = await TaskRepository.delete(data);

            return response;
        } catch (error) {
            return error;
        }
    },

    async list() {
        try {
            const response = await TaskRepository.list();
            return response;
        } catch (error) {
            return error;
        }
    },

    async listByDate(data) {
        try {
            const validation = validate.validate(data, Constraints.get);
            if (validation) {
                const response = Constants.ErrorValidation;
                response.message = validation;
                return response;
            }
            const response = await TaskRepository.listByDate(data);
            return response;
        } catch (error) {
            return error;
        }
    },
};
module.exports = Task;