import "./styles/components.css";
import copyText from'./icons/copy-text-md.svg';

const CopyText = (setValue) => {
    return (
        <span 
            className="copy-text"
            role="button" 
            title="Copiar contenido plano"
            // onClick para copiar el texto del editor
            onClick={() => navigator.clipboard.writeText(setValue)}
        >
            <img src={copyText} alt="copy text" />
        </span>
    );
}

export default CopyText;