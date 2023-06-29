import React, { useState, useEffect } from 'react';
import './style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ClientTask from '../../services/task.js';
import ModalUpdate from '../ModalUpdate';

export default function Table(props) {
    const [tableData, setTableData] = useState([]);


    useEffect(() => {
        // Atualiza a tabela sempre que props.message.data for alterado
        const data = props.message.data ? props.message.data : [props.message];
        setTableData(data);
    }, [props.message]);

    function formatarData(data) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    }

    async function handleApagarTarefa(idDaTarefa) {
        await ClientTask.delete({
            id: idDaTarefa
        });
        // Atualiza a tabela após apagar a tarefa
        const updatedTableData = tableData.filter(item => item.id !== idDaTarefa);
        setTableData(updatedTableData);
    }

    async function handleEditarTarefa(data) {
        console.debug(data)
        props.handleOpenModalUpdate(data)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome da tarefa</th>
                    <th>Status da tarefa</th>
                    <th>Data prazo para conclusão da tarefa</th>
                    <th>Descrição da tarefa</th>
                    <th></th> {/* Coluna para os botões */}
                </tr>
            </thead>
            <tbody>
                {tableData && tableData.length > 0 ? (
                    tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td>{item.status}</td>
                            <td>{formatarData(item.dataPrazo)}</td>
                            <td>{item.descricao}</td>
                            <td>
                                <div className="action-buttons-container">
                                    <button onClick={() => handleApagarTarefa(item.id)} className="action-button">
                                        <FaTrashAlt />
                                    </button>
                                    <button onClick={() => handleEditarTarefa(item)} className="action-button">
                                        <FaEdit />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Sem dados</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}