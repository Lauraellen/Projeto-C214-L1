import './style.css';

export default function Table(props) {

    const data = props.message.data ? props.message.data : [props.message];

    function formatarData(data) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    }

    return (

        <table>
            <thead>
                <tr>
                    <th>Nome da tarefa</th>
                    <th>Status da tarefa</th>
                    <th>Data prazo para conclusão da tarefa</th>
                    <th>Descrição da tarefa</th>
                </tr>
            </thead>
            <tbody>

                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td>{item.status}</td>
                            <td>{formatarData(item.dataPrazo)}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">Sem dados</td>
                    </tr>
                )}
            </tbody>
        </table>


    )
}