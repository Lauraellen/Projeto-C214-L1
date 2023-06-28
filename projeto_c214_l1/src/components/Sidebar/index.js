import { Link } from 'react-router-dom';
import { FaRegListAlt } from "react-icons/fa";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import listContacts from '../../assets/list-contacts.png';
import './style.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div>
            </div>
            <Link to="/">
                <AiFillHome color="white" size={24} />
                Home
            </Link>
            <Link to="/list">
                <FaRegListAlt color="white" size={24} />
                Listar todos usuários
            </Link>
            <Link to="/listByFilter">
                <AiOutlineSearch color="white" size={24} />
                Buscar por email
            </Link>
        </div>
    )
}