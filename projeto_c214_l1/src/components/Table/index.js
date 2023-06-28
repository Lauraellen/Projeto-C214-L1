export default function Table(props) {

    const data = props.message.data ? props.message.data : [props.message];
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
                            <td>{item.dataPrazo}</td>
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