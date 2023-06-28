import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';
import Table from '../../components/Table';
import { HiOutlineUsers } from 'react-icons/hi'
import React, { useEffect, useState } from 'react';

import './style.css';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
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

    const [inputValue, setInputValue] = useState(false); 
    const handleOpenModalCreate = () => { setInputValue(true); };

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
                    <Button text="Criar nova tarefa" onClick={handleOpenModalCreate}></Button>
                </div>
                <div>
                    <ModalCreate abrirModal={inputValue} setObjetos={setObjetos}></ModalCreate>
                </div>
                {/* <div className="button">
                    <Button text="Apagar tarefa" onClick={handleOpenModal}></Button>
                </div> */}
            </div>
        </div>
    )
}