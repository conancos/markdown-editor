import React, { useState, useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'



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
    const guidelines =
`<div align="center">

# Bienvenidos al previsualizador de Markdown en React!

## ESTO ES UN ENCABEZADO PARA SUBTITULOS

### \`<h3>\`Encabezado de tercer nivel\`<\\h3>\`
#### \`<h4>\` Un texto del tamaño normal, pero en negrita

##### \`<h5>\` Otro texto de tamaño más pequeño que el normal, en negrita

###### \`<h6>\` Aquí un texto de tamaño aún más pequeño</div>

Si necesitas comentar algo, puedes usar la sintaxis de HTML: <--! comentario de una o varias líneas. -->

Si necesitas marcar un poco de código \`<div>container</div>\`, o resaltar un \`trozo de texto\` entre 2 acentos invertidos(\`backticks\`), entre líneas.

\`\`\`javascript
// O crear un cuadro de código en varias líneas:

function anotherExample(firstLine, lastLine) {
if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`

> Puedes usar líneas de cíta en bloque y casillas de marcado de listas:

- [X] También puedes marcar texto en **negrita,** _cursiva_ o ~~texto tachado~~.
- [ ] Puedes usar HTML para <u>subrayar texto</u>
- [X] O marcar el texto usando <u>**~~_LOS 2 MODOS_~~**</u>


---
>     Puedes usar diferentes niveles en bloque
>     de varias líneas:
> - Usando listas desordenadas
> - También llamadas viñetas.
>    - Con diferentes niveles de indentación.
>    - [X] O con casillas de marcado de listas.
>       - Y con diferentes niveles de indentación.
>1. O usar listas numeradas
>2. [X] con casillas de marcado de listas.
>       1. También con diferentes
>       2. niveles de indentación
>           1. [X] También usando marcado de listas
>           2. en varios niveles de indentación.
---

Puedes usar la etiqueta \`<br>\` para generar un salto de línea
<br>

---
Y si quieres llevarlo al siguiente nivel, incluso tablas:


Encabezado Salvaje | Encabezado Loco | ¿Otro encabezado?
------------------ | --------------- | -----------------
Tu contenido puede | estar aquí, y  | aquí también...
Y aquí. | Vale. | Creo que lo entendemos.
---

- Enlaces a [sitios externos ↗](https://conancos.dev/portfolio#contact)

- Enlaces de anclaje, [al propio documento](#Bienvenidos-al-previsualizador-de-Markdown-en-React!)


\`\`\`Puedes usar imágenes y centrarlas:\`\`\`

<div align="center">

<img src='./vite.svg' alt="logo de Vite1" width="50px"/> <img src="react.svg" alt="logo de Vite2" width="50px" />
</div>

<small>O limitar su tamaño</small>: [<img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg" width="200px" alt="logo de freeCodeCamp" />](https://freecodecamp.org/espanol/)

<u>Y hasta establecer una imagen como una URL:</u>
<div align="center">

<--! [![Logo CONAN_COS](https://conancos.dev/next/logica-js/CashRegister/images/logo-conancos.png)](https://conancos.dev/portfolio#contact) -->

O animar una parte de tu documento con un GIF:
![imagen de un teseracto](./Teseracto.gif)

<br>
<small>Enriquece y diviértete creando tu documento markdown en tiempo real y súbelo a tu GitHub!</small>
</div>


`;
    const [value, setValue] = useState(guidelines);

    // referencias para el scroll
    const editorRef = useRef(null);
    const previewRef = useRef(null);

    const createMarkup = (text) => {
        const rawMarkup = marked(text, { 
            gfm: true, 
            breaks: true,
            sanitize: true
        }); //Convertir markdown a html
        return { __html: DOMPurify.sanitize(rawMarkup) }; //Sanitizar
    }

    useEffect(() => {
        setValue(guidelines);
    }, [guidelines])

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