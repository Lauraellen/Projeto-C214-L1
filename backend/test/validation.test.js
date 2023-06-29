const Constants = require('../src/utils/constants');
const Validation = require('../src/utils/validation');

it('Caso válido', () => {
    const result = Validation.create({
        nome: "Tarefa de inglês",
        status: "Pendente",
        dataPrazo: "05/07/2023",
        descricao: "Fazer exercícios da pag. 20 do livro"
    });
    expect(result).toEqual(undefined);
});

it('Caso inválido - sem o parâmetro nome', () => {
    const result = Validation.create({
        status: "Concluída",
        dataPrazo: "30/06/2023",
        descricao: "Enviar e-mail com o arquivo"
    });
    expect(result.name).toEqual(Constants.ErrorValidation.name);
});