import React, { useState, useRef } from 'react'


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
        props.editorRef.current.scrollTop = event.target.scrollTop;
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
            <h5>{props.title}</h5>
            {container}
        </aside>
    )
};






const Main = () => {
    const guidelines = `
    # Welcome to my React Markdown Previewer!

    ## This is a sub-heading...
    ### And here's some other cool stuff:

    Heres some code, \`<div></div>\`, between 2 backticks.

    \`\`\`
    // this is multi-line code:

    function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
        }
    }
    \`\`\`

    You can also make text **bold**... whoa!
    Or _italic_.
    Or... wait for it... **_both!_**
    And feel free to go crazy ~~crossing stuff out~~.

    There's also [links](https://www.freecodecamp.org), and
    > Block Quotes!

    And if you want to get really crazy, even tables:

    Wild Header | Crazy Header | Another Header?
    ------------ | ------------- | -------------
    Your content can | be here, and it | can be here....
    And here. | Okay. | I think we get it.

    - And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
            - That look like this.


    1. And there are numbered lists too.
    1. Use just 1s if you want!
    1. And last but not least, let's not forget embedded images:

    ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
    `;
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