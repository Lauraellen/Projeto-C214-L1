const mongoose = require('mongoose');

const uri = `mongodb+srv://usuarioc214:usuarioc214@listadetarefas.jb3axxf.mongodb.net/`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { Schema } = mongoose;

const TaskSchema = new Schema({
    id: {
        type: String,
        index: true,
        unique: true,
    },
    nome: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        unique: true,
    },
    dataPrazo: {
        type: String,
        unique: true,
    },
    descricao: {
        type: String,
        unique: true,
    },
    nome: String,
    status: String,
    dataPrazo: String,
    descricao: String
});

const TaskModel = mongoose.model('TaskModel', TaskSchema);

module.exports = {
    TaskModel,
};