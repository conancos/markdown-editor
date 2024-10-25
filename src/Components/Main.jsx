
const Aside = (props) => {
    
    const container = (
        props.title === 'Editor' 
            ? <textarea id="editor"></textarea> 
            : <div id="preview"></div>
    );

    return (
        <aside className={props.className}>
            <h5>{props.title}</h5>
            {container}
        </aside>
    )
};

const Main = () => {

    return (
        <main className="main">
            <Aside className="a-left" title="Editor" />
            <Aside className="a-right" title="Preview" />
        </main>
    )
};

export default Main