import React, { useState, useEffect, useRef } from 'react'
import guidelines from './guidelines.js'
import DOMPurify from 'dompurify'
import { marked, use } from 'marked'
import markedAlert from 'marked-alert'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript.js'
//import 'prismjs/themes/prism-okaidia.css'


marked.use(markedAlert());
marked.setOptions({
    gfm: true,
    breaks: true,
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript'),
    //tables: true
});



const Items = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} /* isExpanded={isExpanded} */ >
        {isExpanded ? '🔽' : '🔼'}
    </span>
);


const Aside = ({ 
    className, 
    title, 
    value, 
    setValue,
    //guidelines,
    editorRef, 
    previewRef, 
    createMarkup, 
    isExpanded,
    toggleExpand
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
    
    const Content = () => {
        return (
            title === 'Editor' 
            ? (
                <>
                    <header className={`title-${title.toLowerCase()}`}>
                        {title}
                        <Items className={title === "Editor" ? "expand-icon-toright" : "expand-icon-toleft"} toggleExpand={toggleExpand} isExpanded={isExpanded} />
                    </header>
                    <textarea 
                        id="editor"
                        placeholder={guidelines}
                        onChange={handleChange}
                        value={value}
                        
                        ref={editorRef}
                        onScroll={handleScroll}
                        //className={isExpanded ? 'expanded' : 'collapsed'}
                    />
                </>
            )
            : (
                <>
                    <header className={`title-${title.toLowerCase()}`}>
                        <Items className={title === "Editor" ? "expand-icon-toright" : "expand-icon-toleft"} toggleExpand={toggleExpand} isExpanded={isExpanded} />
                        {title}
                    </header>
                    <div 
                        id="preview"
                        ref={previewRef}
                        onScroll={handleScroll}
                        dangerouslySetInnerHTML={createMarkup(value)}
                        //className={isExpanded ? 'expanded' : 'collapsed'}
                    />
                </>
            )
        );
    }     
    
    return (
        <aside className={className}>
            <Content />
        </aside>
    )
};


const Main = () => {
    
    const [value, setValue] = useState(guidelines);
    const [isExpanded, setExpanded] = useState(false);
    const editorRef = useRef(null);
    const previewRef = useRef(null);

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
    }, [value, isExpanded]);

    // Función para expandir o contraer el editor
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };
    
    return (
        <main className="main">
            <Aside 
                className={`a-left ${ isExpanded ? 'expanded' : 'collapsed'}`}
                title="Editor" 
                value={value} 
                setValue={setValue}
                //guidelines={guidelines}
                editorRef={editorRef}
                previewRef={previewRef}
                createMarkup={createMarkup}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
            />
            <Aside 
                className={`a-right ${ isExpanded ? 'expanded' : 'collapsed'}`}
                title="Preview" 
                value={value} 
                //setValue={setValue} // quizás no es necesario
                previewRef={previewRef}
                editorRef={editorRef}
                
                createMarkup={createMarkup}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
            />
        </main>
    )
};

export default Main