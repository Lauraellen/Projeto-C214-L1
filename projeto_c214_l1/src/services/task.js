import client from './config';

const taskPath = '/task';

const ClientTask = {
    async listAll() {
        try {
            const response = await client.get(`${taskPath}/list`);
            return response;
        } catch (e) {
            return e;
        }
    },
    
    async listByFilter(data) {
        try {
            const response = await client.patch(`${taskPath}/listTask`, data);
            return response;
        } catch (e) {
            return e;
        }
    },

    async create(data) {
        try {
            const response = await client.post(`${taskPath}/create`, data);
            return response;
        } catch (e) {
            return e;
        }
    },
};

export default ClientTask;