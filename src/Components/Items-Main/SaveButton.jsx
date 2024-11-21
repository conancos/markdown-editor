import save from './icons/save.svg'
import "./styles/components.css";

const SaveButton = ({ id, value, isSave, isModified }) => (

    <span 
        className="save-button" 
        onClick={() => saveFile(id, value)} 
        role="button" 
        title="Guardar"
    >
        {
            <img src={save} alt="save icon" />
        }
    </span>
)


export default SaveButton