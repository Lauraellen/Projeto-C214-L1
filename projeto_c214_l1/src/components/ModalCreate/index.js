import React, { useEffect, useState } from 'react';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Home from '../../pages/Home/index.js';

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
        }
    }, [abrirModal]);

    return (
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
            <h2>Criar nova tarefa</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '150px' }}>Nome da tarefa:</p>
                <input type="text" value={nomeDaNovaTarefa} onChange={(e) => setNomeDaNovaTarefa(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '150px' }}>Status da tarefa:</p>
                <input type="text" value={statusDaNovaTarefa} onChange={(e) => setStatusDaNovaTarefa(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '20px' }}>Data prazo para conclusão da tarefa:</p>
                <input type="text" value={dataPrazoDaNovaTarefa} onChange={(e) => setDataPrazoDaNovaTarefa(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '128px' }}>Descrição da tarefa:</p>
                <input type="text" value={descricaoDaNovaTarefa} onChange={(e) => setDescricaoDaNovaTarefa(e.target.value)} />
            </div>
            <div className="button">
                <Button text="Salvar" onClick={criarNovaTarefa}></Button>
            </div>
        </Modal>
    );
};

export default ModalCreate;
