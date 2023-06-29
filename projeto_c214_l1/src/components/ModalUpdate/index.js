import React, { useEffect, useState } from 'react';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './style.css';

const ModalUpdate = ({ abrirModal, closeModal, setObjetos, data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [novoNomeDaTarefa, setNovoNomeDaTarefa] = useState('');
  const [novoStatusDaTarefa, setNovoStatusDaTarefa] = useState('');
  const [novaDataPrazoDaTarefa, setNovaDataPrazoDaTarefa] = useState('');
  const [novaDescricaoDaTarefa, setNovaDescricaoDaTarefa] = useState('');
  const [exibirErro, setExibirErro] = useState(false);

  const handleOpenModal = () => {
    console.debug('DATA => ', data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal(); // Call the closeModal function passed as prop
  };

  const atualizarTarefa = async () => {
    if (
      novoNomeDaTarefa === '' ||
      novoStatusDaTarefa === '' ||
      novaDataPrazoDaTarefa === '' ||
      !isValidDate(novaDataPrazoDaTarefa)
    ) {
      setExibirErro(true);
      return;
    }

    setExibirErro(false);

    const updatedData = {
      id: data.id,
      nome: novoNomeDaTarefa,
      status: novoStatusDaTarefa,
      dataPrazo: novaDataPrazoDaTarefa,
      descricao: novaDescricaoDaTarefa,
    };

    await ClientTask.update(updatedData);

    const resultado = await getTask();
    setObjetos(resultado);

    // Clear the fields after task update
    setNovoNomeDaTarefa('');
    setNovoStatusDaTarefa('');
    setNovaDataPrazoDaTarefa('');
    setNovaDescricaoDaTarefa('');

    handleCloseModal();
  };

  const isValidDate = (dateString) => {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
  };

  const getTask = () => {
    return new Promise((resolve) => {
      // Simulating a wait time
      setTimeout(() => {
        const list = ClientTask.listAll();
        resolve(list);
      }, 1000);
    });
  };

  useEffect(() => {
    console.debug('data => ', data);
    if (data) {
      setModalOpen(true);
      setNovoNomeDaTarefa(data.nome);
      setNovaDataPrazoDaTarefa(data.dataPrazo);
      setNovoStatusDaTarefa(data.status);
      setNovaDescricaoDaTarefa(data.descricao);
    }
  }, [data]);

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
      {exibirErro && <p>Preencha todos os campos obrigatórios corretamente.</p>}
      <div className="form-field">
        <label htmlFor="novoNomeDaTarefa">Nome da tarefa:</label>
        <input
          type="text"
          id="novoNomeDaTarefa"
          value={novoNomeDaTarefa}
          onChange={(e) => setNovoNomeDaTarefa(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-field">
        <label htmlFor="novoStatusDaTarefa">Status da tarefa:</label>
        <select
          id="novoStatusDaTarefa"
          value={novoStatusDaTarefa}
          onChange={(e) => setNovoStatusDaTarefa(e.target.value)}
          className="select-field"
        >
          <option value="">Selecione...</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="novaDataPrazoDaTarefa">Data prazo para conclusão da tarefa:</label>
        <input
          type="date"
          id="novaDataPrazoDaTarefa"
          value={novaDataPrazoDaTarefa}
          onChange={(e) => setNovaDataPrazoDaTarefa(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-field">
        <label htmlFor="novaDescricaoDaTarefa">Descrição da tarefa:</label>
        <textarea
          id="novaDescricaoDaTarefa"
          value={novaDescricaoDaTarefa}
          onChange={(e) => setNovaDescricaoDaTarefa(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div className="button">
        <Button text="Salvar" onClick={atualizarTarefa} />
      </div>
    </Modal>
  );
};

export default ModalUpdate;
