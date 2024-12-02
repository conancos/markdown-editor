import "./styles/components.css";
import trash from "./icons/trash.svg";

const Trash = ({setValue, setIsModified}) => {

    const handleClick = () => {

        const userConfirmed = window.confirm("¿Borrar el contenido del Editor?")
        
        if (userConfirmed) {
            setValue("");
            setIsModified(true);
            console.log("Contenido borrado");
        }
    };

    return (
        <span 
            className="trash-button"
            role="button"
            title="Despejar Editor"
            onClick={handleClick}
            >
            <img src={trash} alt="trash icon" />
        </span>
    );
};

export default Trash;