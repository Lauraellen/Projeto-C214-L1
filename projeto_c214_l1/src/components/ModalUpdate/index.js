import React, { useEffect, useState } from 'react';
import ClientTask from '../../services/task.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './style.css';

const ModalCreate = ({ abrirModal, closeModal, setObjetos }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nomeDaNovaTarefa, setNomeDaNovaTarefa] = useState('');
  const [statusDaNovaTarefa, setStatusDaNovaTarefa] = useState('');
  const [dataPrazoDaNovaTarefa, setDataPrazoDaNovaTarefa] = useState('');
  const [descricaoDaNovaTarefa, setDescricaoDaNovaTarefa] = useState('');
  const [exibirErro, setExibirErro] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal(); // Chama a função closeModal passada como prop
  };

  const criarNovaTarefa = async () => {
    if (
      nomeDaNovaTarefa === '' ||
      statusDaNovaTarefa === '' ||
      dataPrazoDaNovaTarefa === '' ||
      !isValidDate(dataPrazoDaNovaTarefa)
    ) {
      setExibirErro(true);
      return;
    }

    setExibirErro(false);

    await ClientTask.create({
      nome: nomeDaNovaTarefa,
      status: statusDaNovaTarefa,
      dataPrazo: dataPrazoDaNovaTarefa,
      descricao: descricaoDaNovaTarefa,
    });

    const resultado = await getTask();
    setObjetos(resultado);

    // Limpar os campos da modal após a criação da tarefa
    setNomeDaNovaTarefa('');
    setStatusDaNovaTarefa('');
    setDataPrazoDaNovaTarefa('');
    setDescricaoDaNovaTarefa('');

    handleCloseModal();
  };

  const isValidDate = (dateString) => {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
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

  useEffect(() => {
    setModalOpen(abrirModal); // Atualiza o estado modalOpen com o valor de abrirModal
  }, [abrirModal]);

  return (
    <Modal isOpen={modalOpen} onClose={handleCloseModal}>
      <h2>Criar nova tarefa</h2>
      {exibirErro && <p>Preencha todos os campos obrigatórios corretamente.</p>}
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
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluída">Concluída</option>
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
        <Button text="Salvar" onClick={criarNovaTarefa} />
      </div>
    </Modal>
  );
};

export default ModalCreate;