import markdown2 from '../assets/icons/markdown2.svg'

const Header = () => {

    const svgStyle = {
        backgroundImage: `url(${markdown2})`, 
        backgroundPosition: "center 1px", 
        backgroundSize: "contain", 
        backgroundRepeat: "no-repeat",
        width: "32px", 
        height: "32px",
        marginInline: ".2rem", 
    }

    return (
        <header className="header">
            <nav><span>🔵</span><span>⚪</span><span>🟣</span></nav>
            <h1>Estiliza en Markdown</h1>
            <span style={svgStyle}></span>
        </header> 
    )
}

export default Header