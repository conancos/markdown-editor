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
import ExpandFull from './Items-Main/Expand-fullscreen'
import DesynchronizeScroll from './Items-Main/desynchronize-scroll'
import SaveButton from './Items-Main/SaveButton'
import Trash from './Items-Main/Trash'
import CopyText from './Items-Main/CopyText'

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
    isSyncro,
    setIsSyncro,
    setIsModified,
    /* isSaved,
    setIsSaved */
}) => {

        // Función que detecta cambios 
    const handleInputChange = (event) => {
        setValue(event.target.value);
        setIsModified(true);
    }    

    const handleScroll = (event) => {
        if (!isSyncro) return;

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
                    <CopyText value={value} />
                    <Trash setValue={setValue} />
                    <DesynchronizeScroll 
                        isSyncro={isSyncro} 
                        toggleSync={setIsSyncro} 
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
                    <DesynchronizeScroll 
                        isSyncro={isSyncro} 
                        toggleSync={setIsSyncro} 
                    />
                    <SaveButton />
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
    const [isSyncro, setIsSyncro] = useState(true);
    const [isModified, setIsModified] = useState(false);
    const editorRef = useRef(null);
    const previewRef = useRef(null);

   
    // detectar cambios en el código dentro de VSCODE
    useEffect(() => {
        setValue(guidelines);
    }, [guidelines]);
    
    // Convertir markdown a html y sanitizarlo
    const createMarkup = (text) => {
        const rawMarkup = marked(text);
        return { __html: DOMPurify.sanitize(rawMarkup) };
    };

    // resaltar el código cuando cambie guidelines
    useEffect(() => {
        Prism.highlightAll();
    }, [guidelines]);
    // resaltar el codigo cuando cambie value, isEditorExpanded o isPreviewExpanded
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
        setPreviewExpandedFull(false);
    };
    const toggleFullscreenPreview = () => {
        setPreviewExpandedFull((prev) => !prev);
        setEditorExpandedFull(false);
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
                isSyncro={isSyncro}
                setIsSyncro={setIsSyncro}
                setIsModified={setIsModified}
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
                isSyncro={isSyncro}
                setIsSyncro={setIsSyncro}
            />
        </main>
    )
};

export default Main