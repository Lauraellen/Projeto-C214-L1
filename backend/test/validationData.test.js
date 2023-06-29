const Task = require('../src/application/task_service');
const Constants = require('../src/utils/constants');
const Utils = require('../src/utils/utils');
const TaskRepository = require('../src/port/task_repository');

jest.mock('../src/port/task_repository');

it('CREATE - Dado válido', async () => {
    const data = {
        nome: "Entregar projeto do trabalho",
        status: "Pendente",
        dataPrazo: "30/07/2023"
    }

    const id = Utils.generateUuid();

    TaskRepository.create.mockResolvedValue({ ...data, id });

    const result = await Task.create(data);
    expect(result).toEqual({ ...data, id });
})

it('CREATE - Dado duplicado', async () => {
    const data = {
        nome: "Entregar projeto do trabalho",
        status: "Pendente",
        dataPrazo: "30/07/2023"
    }

    const id = Utils.generateUuid();

    TaskRepository.create.mockResolvedValue({ code: 11000 });

    const result = await Task.create(data);
    expect(result).toEqual(Constants.ErrorDuplicate);
})