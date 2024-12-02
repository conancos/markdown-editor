import { useState } from "react";
import "./styles/components.css";
import copyText from'./icons/copy-text-md.svg';

const CopyText = ({ value, setIsModified }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        .then (() => {
            console.log('Copiado al portapapeles');
            setCopied(true);
            setIsModified(false);
            setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
            console.error('Error al copiar al portapapeles: ', err);
        });
    };
    
    return (
        <>
            <span 
                className="copy-text"
                role="button" 
                title="Copiar contenido plano"
                onClick={handleCopy}
            >
                <img src={copyText} alt="copy text" />
            </span>
            {/* Mensaje de confirmación */}
            {copied && <span className="copy-confirmation">Copiado al portapapeles</span>}
        </>
    );
}

export default CopyText;