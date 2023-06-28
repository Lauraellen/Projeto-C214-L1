import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';
import Table from '../../components/Table';
import { HiOutlineUsers } from 'react-icons/hi'
import React, { useEffect, useState } from 'react';

import './style.css';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import ButtonCreate from '../../components/ButtonCreate';
import ModalCreate from '../../components/ModalCreate';

export default function ListAll() {
    const [objetos, setObjetos] = useState([]);

    useEffect(() => {
        getTask().then((resultado) => {
            setObjetos(resultado);
        });
    }, []);

    const getTask = () => {
        return new Promise((resolve) => {
            // Simulando um tempo de espera
            const list = ClientTask.listAll();
            resolve(list);
        });
    };

    const [inputValueCreate, setInputValueCreate] = useState(false); 
    const [inputValueDelete, setInputValueDelete] = useState(false); 
    const handleOpenModalCreate = () => { setInputValueCreate(true); };
    const handleOpenModalDelete = () => { setInputValueDelete(true); };

    return (
        <div>
            <Sidebar />
            <div className="content">
                <Title name="Tarefas">
                    <HiOutlineUsers size={30} />
                </Title>
                <div className="container">
                    <Table message={objetos}></Table>
                </div>
                <div className="button">
                    <ButtonCreate text="Criar nova tarefa" onClick={handleOpenModalCreate}></ButtonCreate>
                </div>
                <div>
                    <ModalCreate abrirModal={inputValueCreate} setObjetos={setObjetos}></ModalCreate>
                </div>
                <div className="button" style={{ marginTop: '1%'}}>
                    <Button text="Apagar tarefa" onClick={handleOpenModalDelete}></Button>
                </div>
            </div>
        </div>
    )
}