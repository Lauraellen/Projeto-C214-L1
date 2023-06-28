import './style.css';

const ButtonCreate = ({ onClick, text }) => {
    return (
        <button className="custom-button-create" onClick={onClick}>
            {text}
        </button>
    );
  };
  
export default ButtonCreate;