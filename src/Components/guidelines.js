const guidelines =
`<div align="center">

# Bienvenidos al previsualizador de Markdown en React!

## ESTO ES UN ENCABEZADO PARA SUBTITULOS

### \`<h3>\`Encabezado de tercer nivel\`<\\h3>\`

#### \`<h4>\` Un texto del tamaño normal, pero en negrita

##### \`<h5>\` Otro texto de tamaño más pequeño que el normal, en negrita

###### \`<h6>\` Aquí un texto de tamaño aún más pequeño</div>

Créate un espectacular README.md para tu proyecto<br>
<sub>![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)</sub> <sup>con sus:</sup>

<details><summary><mark> Nuevas funcionalidades </mark></summary>

> [!NOTE]
> Destaca información que los usuarios deben tener en cuenta, incluso cuando hojean.

> [!TIP]
> Información opcional para ayudar al usuario a tener más éxito.

> [!IMPORTANT]
> Información crucial necesaria para que los usuarios tengan éxito.

> [!WARNING]
> Contenido crítico que exige atención inmediata del usuario debido a riesgos potenciales.

> [!CAUTION]
> Consecuencias potenciales negativas de una acción.

</details>

Si necesitas crear <em>comentarios,</em> puedes usar la sintaxis de HTML <!-- comentario de una o varias líneas. -->

Si necesitas marcar código en línea: \`<div>container</div>\`, o resaltar un \`trozo de texto\` ponlo entre 2 acentos invertidos(\`backticks\`), entre líneas.

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

Puedes usar la etiqueta \`<br>\` para generar saltos de línea
<br>

---
Y si quieres llevarlo al siguiente nivel, incluso tablas:

| Encabezado Salvaje | Encabezado Loco | ¿Otro encabezado? |
| ------------------ | --------------- | ----------------- |
| Tu contenido puede | estar aquí, y | aquí también... |
| Y aquí. | Vale. | Creo que lo entendemos. |

---

- Enlaces a [sitios externos ↗](https://conancos.dev/portfolio#contact)

- Enlaces de anclaje, [al propio documento](#Bienvenidos-al-previsualizador-de-Markdown-en-React!)

<div align="center">

\`\`\`Puedes usar imágenes y centrarlas:\`\`\`

<img src='./vite.svg' alt="logo de Vite1" width="50px"/> <img src="react.svg" alt="logo de Vite2" width="50px" />

<sup>O limitar su tamaño:</sup> [<img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg" width="200px" alt="logo de freeCodeCamp" />](https://freecodecamp.org/espanol/)

<mark>Y hasta establecer una imagen como una URL:</mark>

[![Logo CONAN_COS](https://conancos.dev/next/logica-js/CashRegister/images/logo-conancos.png)](https://conancos.dev/portfolio#contact)

O animar una parte de tu documento con un GIF:
![imagen de un teseracto](./Teseracto.gif)


<small>Enriquece y diviértete creando tu documento markdown en tiempo real y súbelo a tu GitHub!</small>

`;

export default guidelines;