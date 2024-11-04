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
    /* highlight: (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript'),
    tables: true */
});


const Aside = (props) => {
        
    const handleChange = (event) => {
        props.setValue(event.target.value);
    }

    const handleScroll = (event) => {
        if (props.title === 'Editor') {
            props.previewRef.current.scrollTop = event.target.scrollTop;
            
        } else {
            props.editorRef.current.scrollTop = event.target.scrollTop;
        }
        /* props.editorRef.current.scrollTop = event.target.scrollTop; */
    }
    
    const container = props.title === 'Editor' 
        ? (
            <textarea 
                id="editor"
                placeholder={props.guidelines}
                onChange={handleChange}
                value={props.value}

                ref={props.editorRef}
                onScroll={handleScroll}
            />
        )
        : (
            <div 
                id="preview"
                ref={props.previewRef}
                onScroll={handleScroll}
                dangerouslySetInnerHTML={props.createMarkup(props.value)}
            />
        )
    ;
    
    return (
        <aside className={props.className}>
            <h5 className={`title-${props.title.toLowerCase()}`}>{props.title}</h5>
            {container}
        </aside>
    )
};


const Main = () => {
    
    const [value, setValue] = useState(guidelines);

    // referencias para el scroll
    const editorRef = useRef(null);
    const previewRef = useRef(null);

    useEffect(() => {
        Prism.highlightAll();
    }, [guidelines]);

    const createMarkup = (text) => {
        const rawMarkup = marked(text); //Convertir markdown a html
        return { __html: DOMPurify.sanitize(rawMarkup) }; //Sanitizar
    };

    // useEffect para detectar cambios en el código dentro de VSCODE
    useEffect(() => {
        setValue(guidelines);
    }, [guidelines]);

    // useEffect para detectar cambios en el código dentro del editor MARKDOWN
    useEffect(() => {
        Prism.highlightAll();
        // Seleccionamos todos los elementos <code> en línea y añadimos la clase "language-javascript"
        const inlineCodeElements = previewRef.current.querySelectorAll('p > code');
        inlineCodeElements.forEach((codeElement) => {
            if (!codeElement.classList.contains('language-javascript')) {
                codeElement.classList.add('language-javascript');
            }
        })
    }, [value]);

    
    return (
        <main className="main">
            <Aside 
                className="a-left" 
                title="Editor" 
                value={value} 
                setValue={setValue}
                guidelines={guidelines}
                
                editorRef={editorRef}
                previewRef={previewRef}
            />
            <Aside 
                className="a-right" 
                title="Preview" 
                value={value} 
                /* setValue={setValue} */

                previewRef={previewRef}
                editorRef={editorRef}
                
                createMarkup={createMarkup}
            />
        </main>
    )
};

export default Main