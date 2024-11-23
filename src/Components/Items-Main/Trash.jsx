import "./styles/components.css";
import trash from "./icons/trash.svg";

const Trash = (setValue) => {
    return (
        <span 
            className="trash-button"
            role="button"
            title="Despejar Editor"
            onClick={() => setValue("")}
            >
            <img src={trash} alt="trash icon" />
        </span>
    );
};

export default Trash;