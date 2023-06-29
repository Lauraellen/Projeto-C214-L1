const Task = require('../src/application/task_service');
const Constants = require('../src/utils/constants');
const Utils = require('../src/utils/utils');
const TaskRepository = require('../src/port/task_repository');
const validate = require('validate.js');
const Constraints = require('../src/utils/task_validation');
const TaskModel = require('../src/infrastructure/database');

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

it('CREATE - Dado incompleto', async () => {
    const data = {
        status: "Pendente",
        dataPrazo: "30/07/2023"
    }

    const id = Utils.generateUuid();

    TaskRepository.create.mockResolvedValue({ code: 11000 });

    const result = await Task.create(data);
    expect(result).toEqual(Constants.ErrorValidation);
})

it('CREATE - Dado incorreto', async () => {
    TaskRepository.create = jest.fn().mockRejectedValue(new Error('Create error'));

    const result = await Task.create({
        nome: "Ir ao cartório",
        status: "Em Andamento",
        dataPrazo: "20/05/2023"
    });

    expect(result).toEqual(new Error('Create error'));
})


it('UPDATE - Dado válido', async () => {
    validate.validate = jest.fn().mockReturnValue(null);

    const mockResponse = { id: 1, nome: 'Tarefa atualizada', status: 'Concluída' };
    TaskRepository.update = jest.fn().mockResolvedValue(mockResponse);

    const data = {
        id: 1,
        nome: 'Tarefa atualizada',
        status: 'Concluída',
        dataPrazo: '30/06/2023'
    };

    const result = await Task.update(data);

    expect(validate.validate).toHaveBeenCalledWith(data, Constraints.update);
    expect(TaskRepository.update).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockResponse);
});

it('UPDATE - Dado Inválido', async () => {
    validate.validate = jest.fn().mockReturnValue(Constants.ErrorValidation);
    TaskRepository.update = jest.fn();

    const data = {
        nome: 'Ir ao cartório',
        status: 'Em Andamento',
        dataPrazo: '20/06/2023'
    };

    const result = await Task.update(data);

    expect(validate.validate).toHaveBeenCalledWith(data, Constraints.update);
    expect(TaskRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual(Constants.ErrorValidation);
});

it('UPDATE - Dado incorreto', async () => {
    validate.validate = jest.fn().mockReturnValue(null);
    TaskRepository.update = jest.fn().mockRejectedValue(new Error('Update error'));

    const data = {
        id: 1,
        nome: 'Tarefa atualizada',
        status: 'Concluída',
        dataPrazo: '30/06/2023'
    };

    const result = await Task.update(data);

    expect(validate.validate).toHaveBeenCalledWith(data, Constraints.update);
    expect(TaskRepository.update).toHaveBeenCalledWith(data);
    expect(result).toEqual(new Error('Update error'));
});

it('UPDATE - Dado não encontrado', async () => {
    validate.validate = jest.fn().mockReturnValue(null);
    TaskRepository.update = jest.fn().mockResolvedValue([]);

    const data = {
        nome: 'Tarefa atualizada',
        status: 'Concluída',
        dataPrazo: '30/06/2023'
    };

    const result = await Task.update(data);

    expect(validate.validate).toHaveBeenCalledWith(data, Constraints.update);
    expect(TaskRepository.update).toHaveBeenCalledWith(data);
    expect(result).toEqual(Constants.ErrorNotFound);
});


