import React, { useState, useEffect } from 'react';
import './style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ClientTask from '../../services/task.js';
import ModalUpdate from '../ModalUpdate';

export default function Table(props) {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        // Atualiza a tabela sempre que props.message.data for alterado
        const data = props.message.data ? props.message.data : [props.message];
        setTableData(data);
        setFilteredData(data);
    }, [props.message]);

    function formatarData(data) {
        const partesData = data.split('-');
        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];
        return `${dia}-${mes}-${ano}`;
      }

    async function handleApagarTarefa(idDaTarefa) {
        await ClientTask.delete({
            id: idDaTarefa
        });
        // Atualiza a tabela após apagar a tarefa
        const updatedTableData = tableData.filter(item => item.id !== idDaTarefa);
        setTableData(updatedTableData);
        setFilteredData(updatedTableData);
    }

    async function handleEditarTarefa(data) {
        console.debug(data);
        props.handleOpenModalUpdate(data);
    }

    function handleFilterChange(event) {
        const value = event.target.value;
        setFilterValue(value);

        const filtered = tableData.filter(item => {
            const nome = item.nome.toLowerCase();
            const filter = value.toLowerCase();

            return nome.includes(filter);
        });

        setFilteredData(filtered);
    }

    return (
        <div className="table-container">
            <input
                type="text"
                placeholder="Filtrar por nome"
                value={filterValue}
                onChange={handleFilterChange}
                className="filter-input"
            />
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
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
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
                            <td colSpan="5">Sem dados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
