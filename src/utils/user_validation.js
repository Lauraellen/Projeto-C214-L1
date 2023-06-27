const create = {
    nome: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
    },
    status: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
    },
    dataPrazo: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
    },
    descricao: {
        presence: {
            allowEmpty: true,
        },
        type: 'string',
    },
};

// const update = {
//     nome: {
//         presence: {
//             allowEmpty: false,
//         },
//         type: 'string',
//     },
//     email: {
//         presence: {
//             allowEmpty: false,
//         },
//         type: 'string',
//     },
// };

// const get = {
//     email: {
//         presence: {
//             allowEmpty: false,
//         },
//         type: 'string',
//     },
// };

// const deleteBy = {
//     email: {
//         presence: {
//             allowEmpty: false,
//         },
//         type: 'string',
//     },
// };

module.exports = {
    // update,
    create,
    // get,
    // deleteBy,
};