const { TaskModel } = require('../src/infrastructure/database');
const task = require('../src/port/task_repository');

describe('create', () => {
    it('Valid Task', async () => {
        TaskModel.prototype.save = jest.fn().mockImplementation(() => ({
            toObject: () => ({
                id: 1,
                nome: "Ir ao cartório",
                status: "Em Andamento",
                dataPrazo: "20/05/2023"
            }),
        }));

        expect(await task.create({
            id: 1,
            nome: "Ir ao cartório",
            status: "Em Andamento",
            dataPrazo: "20/05/2023"
        })).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                status: expect.any(String),
                dataPrazo: expect.any(String)
            }),
        );
    });
});

describe('editTask', () => {
    it('Valid edit', async () => {
        TaskModel.findOneAndUpdate = jest.fn().mockImplementation(() => ({
            exec: () => ({
                toObject: () => ({
                    id: 1,
                    nome: "Ir ao cartório",
                    status: "Em Andamento",
                    dataPrazo: "20/06/2023"
                }),
            }),
        }));

        expect(await task.update({
            nome: "Ir ao cartório",
            status: "Em Andamento",
            dataPrazo: "20/06/2023"
        })).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                status: expect.any(String),
                dataPrazo: expect.any(String),
            }),
        );
    });
});

describe('listTask', () => {
    it('Valid list', async () => {
        TaskModel.find = jest.fn().mockImplementation(() => ({
            exec: () => ({
                id: 1,
                nome: "Ir ao cartório",
                status: "Em Andamento",
                dataPrazo: "20/06/2023"
            }),
        }));

        expect(await task.list()).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: "Ir ao cartório",
                status: "Em Andamento",
                dataPrazo: "20/06/2023"
            }),
        );

    });
});

describe('deleteTask', () => {
    it('Valid delete', async () => {
        TaskModel.deleteOne = jest.fn().mockImplementation(() => ({
            exec: () => ({
                deletedCount: 1,
            }),
        }));

        expect(await task.delete({
            nome: "Ir ao cartório",
            status: "Em Andamento",
            dataPrazo: "20/06/2023"
        })).toEqual(1);
    });
});
