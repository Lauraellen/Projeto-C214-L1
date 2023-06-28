import './style.css';

const Button = ({ onClick, text }) => {
    return (
        <button className="custom-button-delete" onClick={onClick}>
            {text}
        </button>
    );
  };
  
export default Button;