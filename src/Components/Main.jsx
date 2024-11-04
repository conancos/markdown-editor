import React, { useState, useRef } from 'react'
import guidelines from './guidelines'

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
        //props.editorRef.current.scrollTop = event.target.scrollTop;
    }
    

    const container = 
        props.title === 'Editor' 
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
            >
                {props.value}
            </div>
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
                
            />
        </main>
    )
};

export default Main