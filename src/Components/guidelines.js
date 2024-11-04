const guidelines =
`<div align="center">

# Bienvenidos al previsualizador de Markdown en React!

## ESTO ES UN ENCABEZADO PARA SUBTITULOS

### \`<h3>\`Encabezado de tercer nivel\`<\\h3>\`

#### \`<h4>\` Un texto del tamaño normal, pero en negrita

##### \`<h5>\` Otro texto de tamaño más pequeño que el normal, en negrita

###### \`<h6>\` Aquí un texto de tamaño aún más pequeño</div>

> Créate un espectacular README.md para tu proyecto<br>
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

Si necesitas marcar código en línea: \`<div>container</div>\`, o resaltar un \`trozo de texto\` ponlo entre 2 acentos invertidos(\`backticks\`).

\`\`\`javascript
// O crear un cuadro de código en varias líneas:

function anotherExample(firstLine, lastLine) {
if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`

> Puedes usar líneas de cíta y lista de tareas:

- [X] También puedes marcar texto en **negrita,** _cursiva_ o ~~texto tachado~~.
- [ ] Puedes usar HTML para <u>subrayar texto</u>
- [X] O marcar el texto usando <u>**~~_LOS 2 MODOS_~~**</u>


> Puedes usar diferentes niveles en **bloque**
> de **varias líneas**:
> - Usando <u>**Listas desordenadas**</u>
> - También llamadas viñetas
>    - A diferentes niveles
>    - [X] Aquí también funcionan las casillas de _marcado de listas._
>       - [ ] Y con mas niveles de indentación.
> 1. [X] O usar <u>**Listas numeradas**</u>
> 2. [ ] con casillas de marcado de listas.
>       3. También con diferentes
>       4. niveles de indentación.
>           5. [X] También usando marcado de listas
>           6. [ ] En niveles de indentación más profundos.


Puedes usar la etiqueta \`<br>\` para generar saltos de línea
O la etiqueta \`<hr>\` para crear una linea horizontal o 3 guiones ---
<br>


---
<mark>Y si quieres llevarlo al siguiente nivel, incluso **tablas:**</mark>

| Primera Columna | Segunda Columna | Tercera Colmna |
| --- | --- | --- |
| Tu contenido | Tu contenido | Tu contenido |
| [Mi Portfolio][conancos.dev] | [Mi GitHub][mi-GitHub] | [Mi Linkedin][mi-LinkedIn] |


- Enlaces a [sitios externos ↗](https://conancos.dev/portfolio#contact)

- Enlaces de anclaje, [al propio documento](#Bienvenidos-al-previsualizador-de-Markdown-en-React!)

<div align="center">

\`Puedes usar imágenes y centrarlas:\`

<img src='./vite.svg' alt="logo de Vite1" width="50px"/> <img src="react.svg" alt="logo de Vite2" width="50px" />

<sup>O limitar su tamaño:</sup> [<img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg" width="200px" alt="logo de freeCodeCamp" />](https://freecodecamp.org/espanol/)

<mark>Y hasta establecer una imagen como una URL:</mark>

[![Logo CONAN_COS](https://conancos.dev/next/logica-js/CashRegister/images/logo-conancos.png)](https://conancos.dev/portfolio#contact)

O animar una parte de tu documento con un GIF:
![imagen de un teseracto](./Teseracto.gif)

<small>Enriquece y diviértete creando tu documento markdown en tiempo real y súbelo a tu GitHub!</small>
</div>

- ❗❓ Y aunque parezca increíble, puedes usar variables, que solo se verán en tu editor:
  - 👨‍💻 [Visita mi LinkedIn ↗][mi-LinkedIn]
  - 🚀 [Visita mi GitHub ↗][mi-GitHub]
  - 👨‍🎓 [Visita mi portfolio ↗][conancos.dev]
  - 👩‍🏫 [Visita freeCodeCamp ↗][freeCodeCamp]
- 💖 Si te ayuda y quieres dejar un [comentario ↗][mi-LinkedIn]



<!-- Variables -->

[conancos.dev]: https://conancos.dev/portfolio
[mi-GitHub]: https://github.com/conancos
[mi-LinkedIn]: https://www.linkedin.com/in/joaquin-martinez-cortes/
[freeCodeCamp]: https://freecodecamp.org/espanol
`;

export default guidelines;