const mongoose = require('mongoose');

const uri = `mongodb+srv://usuarioC214:usuarioC214@listadetarefas.jb3axxf.mongodb.net/?retryWrites=true&w=majority`;

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
        type: String
    },
    status: {
        type: String
    },
    dataPrazo: {
        type: String
    },
    descricao: {
        type: String
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