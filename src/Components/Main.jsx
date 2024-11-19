import React, { useState, useEffect, useRef } from 'react'
import guidelines from './guidelines.js'
import DOMPurify from 'dompurify'
import { marked, use } from 'marked'
import markedAlert from 'marked-alert'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript.js'
//import 'prismjs/themes/prism-okaidia.css'
import { ExpandLeft, ExpandRight } from './Items-Main/ExpandIndividual'
import { ExpandFull } from './Items-Main/Expand-fullscreen'
import DesynchronizeScroll from './Items-Main/desynchronize-scroll.jsx'

marked.use(markedAlert());
marked.setOptions({
    gfm: true,
    breaks: true,
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript'),
    //tables: true
});


const Aside = ({ 
    className, 
    title, 
    value, 
    setValue,
    editorRef, 
    previewRef, 
    createMarkup, 
    isExpanded,
    toggleExpand,
    isExpandedFull,
    toggleExpandFull,
    isSynced,
    setIsSynced,
    /* handleInputChange, */
    setIsModified
}) => {

        // Función que detecta cambios  
    const handleInputChange = (event) => {
        setValue(event.target.value);
        setIsModified(true);
    }    

    const handleScroll = (event) => {
        if (!isSynced) return;

        if (title === 'Editor') {
            previewRef.current.scrollTop = event.target.scrollTop;
            
        } else {
            editorRef.current.scrollTop = event.target.scrollTop;
        }
        //props.editorRef.current.scrollTop = event.target.scrollTop;
    }
    
    const Content = title === 'Editor' 
        ? (
            <>
                <header className={`title-${title.toLowerCase()}`}>
                    {title}
                    <DesynchronizeScroll 
                        isSynced={isSynced} 
                        toggleSync={setIsSynced} 
                    />
                    <ExpandLeft 
                        className="expand-icon-toright" 
                        toggleExpand={toggleExpand} 
                        isExpanded={isExpanded}
                    />
                    <ExpandFull 
                        className="expandfull-icon-left"
                        isExpandedFull={isExpandedFull}
                        toggleExpandFull={toggleExpandFull}
                    />
                </header>
                <textarea 
                    id="editor"
                    placeholder={guidelines}
                    onChange={handleInputChange}
                    value={value}
                    ref={editorRef}
                    onScroll={(event) => handleScroll(event, 'Editor')}
                    
                />
            </>
        )
        : (
            <>
                <header className={`title-${title.toLowerCase()}`}>
                    <ExpandFull 
                        className="expandfull-icon-right"
                        toggleExpandFull={toggleExpandFull}
                        isExpandedFull={isExpandedFull}
                    />
                    <ExpandRight 
                        className="expand-icon-toleft"
                        isExpanded={isExpanded}
                        toggleExpand={toggleExpand}
                    />
                    {title}
                </header>
                <div 
                    id="preview"
                    ref={previewRef}
                    onScroll={(event) => handleScroll(event, 'Preview') }
                    dangerouslySetInnerHTML={createMarkup(value)}
                />
            </>
        );
        
    ; 
    
    return (
        <aside className={className}>
            {Content} 
        </aside>
    )
};


const Main = () => {
    
    const [value, setValue] = useState(guidelines);
    const [isEditorExpandedFull, setEditorExpandedFull] = useState(false);
    const [isPreviewExpandedFull, setPreviewExpandedFull] = useState(false);
    const [isEditorExpanded, setEditorExpanded] = useState(false);
    const [isPreviewExpanded, setPreviewExpanded] = useState(false);
    const editorRef = useRef(null);
    const previewRef = useRef(null);
    const [isSynced, setIsSynced] = useState(true);
    const [isModified, setIsModified] = useState(false);

    // resaltar el código cuando cambie guidelines
    useEffect(() => {
        Prism.highlightAll();
    }, [guidelines]);

    // Convertir markdown a html y sanitizarlo
    const createMarkup = (text) => {
        const rawMarkup = marked(text);
        return { __html: DOMPurify.sanitize(rawMarkup) };
    };

    // useEffect para detectar cambios en el código dentro de VSCODE
    useEffect(() => {
        setValue(guidelines);
    }, [guidelines]);

    // useEffect para resaltar el codigo cuando cambie value, isEditorExpanded o isPreviewExpanded
    useEffect(() => {
        const codeElements = document.querySelectorAll('#preview pre code, #preview p code');
        
        codeElements.forEach((codeElement) => {
            if (!codeElement.classList.contains('language-javascript')) {
                codeElement.classList.add('language-javascript');
            }
            Prism.highlightElement(codeElement);
        });
    }, [value, isEditorExpanded, isPreviewExpanded]);

    // Funciones para "EXPANDIR" o "CONTRAER": editor y/o previsualizador individualmente
    const toggleEditorExpand = () => { setEditorExpanded(!isEditorExpanded) };
    const togglePreviewExpand = () => { setPreviewExpanded(!isPreviewExpanded) };

    // Funciones fullscreen
    const toggleFullscreenEditor = () => {
        setEditorExpandedFull((prev) => !prev);
        //setPreviewExpanded(prev);
        setPreviewExpandedFull(false);
        //console.log("isEditorExpandedFull: ", !isEditorExpandedFull);
    };
    const toggleFullscreenPreview = () => {
        setPreviewExpandedFull((prev) => !prev);
        // setEditorExpanded(false);
        setEditorExpandedFull(false);
        //console.log("isPreviewExpandedFull: ", !isPreviewExpandedFull);
    };
    
    
    // UseEffect para detectar si se cierra o actualiza la pestaña antes del guardado.
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isModified) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        // Agregar el listener al cargar el componente
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isModified]);
    
    
    // Función para confirmación para salir sin guardar
    /* const confirmExit = () => {
        if (isModified) {
            return window.confirm('Tienes cambios sin guardar. ¿Deseas salir sin guardar?');
        }
        return true;
    } */
    /* window.addEventListener('beforeunload', confirmExit); */
    /* window.addEventListener('click', confirmExit); */

    return (
        <main className="main">
            <Aside 
                className={`a-left ${isEditorExpanded ? 'expanded' : 'collapsed'} ${isEditorExpandedFull ? 'expanded-full' : ''} ${isPreviewExpandedFull ? 'hidden' : ''}`}
                title="Editor" 
                value={value} 
                setValue={setValue}
                editorRef={editorRef}
                previewRef={previewRef}
                isExpanded={isEditorExpanded}
                toggleExpand={toggleEditorExpand}
                isExpandedFull={isEditorExpandedFull}
                toggleExpandFull={toggleFullscreenEditor}
                isSynced={isSynced}
                setIsSynced={setIsSynced}
                /* onChange={handleInputChange} */
                setIsModified={setIsModified}
                /* handleInputChange={handleInputChange} */
            />
            <Aside 
                className={`a-right ${isPreviewExpanded ? 'expanded' : 'collapsed'} ${isPreviewExpandedFull ? 'expanded-full' : ''} ${isEditorExpandedFull ? 'hidden' : ''}`}
                title="Preview"
                value={value}
                previewRef={previewRef}
                editorRef={editorRef}
                createMarkup={createMarkup}
                isExpanded={isPreviewExpanded}
                toggleExpand={togglePreviewExpand}
                isExpandedFull={isPreviewExpandedFull}
                toggleExpandFull={toggleFullscreenPreview}
                isSynced={isSynced}
                setIsSynced={setIsSynced}
            />
        </main>
    )
};

export default Main