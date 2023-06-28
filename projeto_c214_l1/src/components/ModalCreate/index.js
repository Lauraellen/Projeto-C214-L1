import React, { useEffect, useState } from 'react';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './style.css';


const ModalCreate = ({ abrirModal, setObjetos }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [nomeDaNovaTarefa, setNomeDaNovaTarefa] = useState('');
    const [statusDaNovaTarefa, setStatusDaNovaTarefa] = useState('');
    const [dataPrazoDaNovaTarefa, setDataPrazoDaNovaTarefa] = useState('');
    const [descricaoDaNovaTarefa, setDescricaoDaNovaTarefa] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const criarNovaTarefa = async () => {
        handleCloseModal();

        await ClientTask.create({
            nome: nomeDaNovaTarefa,
            status: statusDaNovaTarefa,
            dataPrazo: dataPrazoDaNovaTarefa,
            descricao: descricaoDaNovaTarefa
        });

        const resultado = await getTask(); // Chamada à constante getTask
        setObjetos(resultado);
    };

    const getTask = () => {
        return new Promise((resolve) => {
            // Simulando um tempo de espera
            setTimeout(() => {
                const list = ClientTask.listAll();
                resolve(list);
            }, 1000);
        });
    };

    useEffect(() => {
        if (abrirModal) {
            handleOpenModal();
        } else {
            handleCloseModal();
        }
    }, [abrirModal]);

    return (
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
            <h2>Criar nova tarefa</h2>
            <div className="form-field">
                <label htmlFor="nomeDaNovaTarefa">Nome da tarefa:</label>
                <input
                    type="text"
                    id="nomeDaNovaTarefa"
                    value={nomeDaNovaTarefa}
                    onChange={(e) => setNomeDaNovaTarefa(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="form-field">
                <label htmlFor="statusDaNovaTarefa">Status da tarefa:</label>
                <select
                    id="statusDaNovaTarefa"
                    value={statusDaNovaTarefa}
                    onChange={(e) => setStatusDaNovaTarefa(e.target.value)}
                    className="select-field"
                >
                    <option value="">Selecione...</option>
                    <option value="pendente">Pendente</option>
                    <option value="emProgresso">Em Progresso</option>
                    <option value="concluida">Concluída</option>
                </select>
            </div>
            <div className="form-field">
                <label htmlFor="dataPrazoDaNovaTarefa">Data prazo para conclusão da tarefa:</label>
                <input
                    type="date"
                    id="dataPrazoDaNovaTarefa"
                    value={dataPrazoDaNovaTarefa}
                    onChange={(e) => setDataPrazoDaNovaTarefa(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="form-field">
                <label htmlFor="descricaoDaNovaTarefa">Descrição da tarefa:</label>
                <textarea
                    id="descricaoDaNovaTarefa"
                    value={descricaoDaNovaTarefa}
                    onChange={(e) => setDescricaoDaNovaTarefa(e.target.value)}
                    className="textarea-field"
                />
            </div>
            <div className="button">
                <Button text="Salvar" onClick={criarNovaTarefa}></Button>
            </div>
        </Modal>

    );
};

export default ModalCreate;
