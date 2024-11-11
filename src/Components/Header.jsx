import markdown2 from '../assets/icons/markdown2.svg'
/* const markdown2 = new URL('../assets/icons/markdown2.svg', import.meta.url).href */

const Header = () => {

    const svgStyle = {
        /* backgroundImage: `url(${markdown2})`,  */
        /* backgroundPosition: "center 1px",  */
        /* backgroundSize: "contain",  */
        /* backgroundRepeat: "no-repeat", */
        paddingTop: "2px",
        width: "42px", 
        height: "42px",
        marginInline: ".5rem",
        filter: "drop-shadow(0px 0px 4px #0a142b) drop-shadow(0 0 8px #0a142b)", 

    }

    return (
        <header className="header">
            <nav><span>🔵</span><span>⚪</span><span>🟣</span></nav>
            <h1 className="title-header">Estiliza en Markdown</h1>
            <img src={markdown2} alt="markdown icon" style={svgStyle} />
        </header> 
    )
}

export default Header