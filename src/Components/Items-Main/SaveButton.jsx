import save from './icons/save.svg'
import "./styles/components.css";
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';

const SaveButton = ({id, value, setIsModified}) => {
    const dialogRef = useRef(null);

    /* // función para guardar en formato md o pdf, dependiendo de la extension */
    const handleDownLoad = (e) => {
        //e.preventDefault();

        const format = e.target.id;

        if (format === 'save-md') {
            // Generar el archivo .md
            const blob = new Blob([value], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${id}.md`;
            link.click();
            URL.revokeObjectURL(url);
            console.log("Archivo guardado en formato MD");

        } else if (format === 'save-pdf') {
            // Generar el archivo PDF desde el previsualizador
            const previewElement = document.getElementById('preview');
            previewElement.style.color = 'black';
            const options = {
                margin: 10,
                filename: `${id}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 5, dpi: 300, letterRendering: true},
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all'] }
            };
            html2pdf().set(options).from(previewElement).save();
            console.log("Guardando archivo en formato PDF...");

        }
        
        //dialogRef.current.close();
        //handleClose(e);
              
        setIsModified(false)
        const previewElement = document.getElementById('preview');
        previewElement.style.color = 'black';
    }
    

    const handleClick = (e) => {
        e.preventDefault();
        const previewElement = document.getElementById('preview');
        if (dialogRef.current) {
            dialogRef.current.showModal();
            console.log("Diálogo para guardar abierto");
            previewElement.style.color = 'black';
        }
    };
    const handleClose = (e) => {
        e.preventDefault();
        const previewElement = document.getElementById('preview');
        if (dialogRef.current) {
            dialogRef.current.close();
            console.log("Diálogo para guardar cerrado");
        }
        previewElement.style.color = 'inherit';
    };
        
    
    return (
        <>
            <span 
                className="save-button" 
                onClick={handleClick} 
                role="button" 
                title="Guardar"
            >
                {
                    <img src={save} alt="save icon" />
                }
            </span>
            <dialog className="save-dialog" ref={dialogRef}>
                <p>¿Formato del archivo?</p>
                <div className="buttons-dialog">
                    <button id="save-md" onClick={handleDownLoad}>MD</button>
                    <button id="save-pdf" onClick={handleDownLoad}>PDF</button>
                </div>
                <button className="button-exit" type="button" onClick={handleClose}>Cerrar</button>
            </dialog>
        </>
    )
}


export default SaveButton