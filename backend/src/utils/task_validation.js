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
        presence: false,
        type: 'string',
    }
};

const update = {
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
        presence: false,
        type: 'string',
    }
};

const get = {
    dataPrazo: {
        presence: {
            allowEmpty: false,
        },
        type: 'string',
    },
};

const deleteBy = {
    nome: {
        presence: false,
        type: 'string',
    },
    status: {
        presence: false,
        type: 'string',
    },
    dataPrazo: {
        presence: false,
        type: 'string',
    },
    descricao: {
        presence: false,
        type: 'string',
    }
};

module.exports = {
    update,
    create,
    get,
    deleteBy
};