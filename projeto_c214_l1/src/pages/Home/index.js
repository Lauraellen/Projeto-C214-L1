import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';
import Table from '../../components/Table';
import { GoTasklist } from 'react-icons/go'
import React, { useEffect, useState } from 'react';

import './style.css';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import ButtonCreate from '../../components/ButtonCreate';
import ModalCreate from '../../components/ModalCreate';
import ModalUpdate from '../../components/ModalUpdate';

export default function ListAll() {
    const [objetos, setObjetos] = useState([]);
    const [inputValueCreate, setInputValueCreate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValueUpdate, setInputValueUpdate] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [modalUpdateData, setModalUpdateData] = useState(null);


    const handleOpenModalCreate = () => { setInputValueCreate(true); };

    const handleOpenModalUpdate = (data) => { 
        console.debug('d => ', data)
        setInputValueUpdate(true); 
        setModalUpdateData(data);
    };

    useEffect(() => {
        getTask().then((resultado) => {
            setObjetos(resultado);
        });
    }, []);

    useEffect(() => {
        setIsModalOpen(inputValueCreate);
    }, [inputValueCreate]);

    useEffect(() => {
        setIsModalUpdateOpen(inputValueUpdate);
    }, [inputValueUpdate]);

    const getTask = () => {
        return new Promise((resolve) => {
            // Simulando um tempo de espera
            const list = ClientTask.listAll();
            resolve(list);
        });
    };

    const closeModalCreate = () => {
        setInputValueCreate(false);
    };

    const closeModalUpdate = () => {
        setInputValueUpdate(false);
    };

    return (
        <div>
            <Sidebar />
            <div className="content">
                <Title name="Tarefas">
                    <GoTasklist size={30} />
                </Title>
                <div>
                    <Table message={objetos} handleOpenModalUpdate={handleOpenModalUpdate}></Table>
                </div>
                <div className="button">
                    <ButtonCreate text="Criar nova tarefa" onClick={handleOpenModalCreate}></ButtonCreate>
                </div>
                <div>
                    {isModalOpen && (
                        <ModalCreate abrirModal={inputValueCreate} closeModal={closeModalCreate} setObjetos={setObjetos}></ModalCreate>
                    )}
                </div>
                <div>
                    {isModalUpdateOpen && (
                        <ModalUpdate abrirModal={inputValueUpdate} closeModal={closeModalUpdate} setObjetos={setObjetos} data={modalUpdateData}></ModalUpdate>
                    )}
                </div>
            </div>
        </div>
    )
}