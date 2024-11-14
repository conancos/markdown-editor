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
import { ExpandFull, /* CollapseFull */ } from './Items-Main/Expand-fullscreen'

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
}) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleScroll = (event) => {
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
                    onChange={handleChange}
                    value={value}
                    ref={editorRef}
                    onScroll={handleScroll}
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
                    onScroll={handleScroll}
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

    // useEffect para resaltar el codigo
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

    // useEffect para resaltar el codigo
    useEffect(() => {
        const codeElements = document.querySelectorAll('#preview pre code, #preview p code');
        
        codeElements.forEach((codeElement) => {
            if (!codeElement.classList.contains('language-javascript')) {
                codeElement.classList.add('language-javascript');
            }
            Prism.highlightElement(codeElement);
        });
    }, [value, isEditorExpanded, isPreviewExpanded]);

    // Función para expandir o contraer: editor y previsualizador
    const toggleEditorExpand = () => {
        setEditorExpanded(!isEditorExpanded);
    };
    const togglePreviewExpand = () => {
        setPreviewExpanded(!isPreviewExpanded);
    };

    // Función para expandir o contraer fullscreen: editor o previsualizador
    const toggleFullscreenEditor = () => {
        setEditorExpandedFull((prev) => !prev);
        setPreviewExpanded(false);
        setPreviewExpandedFull(false);
        console.log("isEditorExpandedFull: ", !isEditorExpandedFull);
    };
    const toggleFullscreenPreview = () => {
        setPreviewExpandedFull((prev) => !prev);
        setEditorExpanded(false);
        setEditorExpandedFull(false);
        console.log("isPreviewExpandedFull: ", !isPreviewExpandedFull);
    };
    
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
            />
        </main>
    )
};

export default Main