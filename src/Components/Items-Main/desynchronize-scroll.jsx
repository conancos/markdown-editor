import "./styles/components.css";

const DesynchronizeScroll = ({ isSyncro, toggleSync }) => {
    return (
        <span className="desync-scroll">
            <label title="Barra de scroll">
                <input 
                    type="checkbox" 
                    checked={isSyncro} 
                    onChange={(e) => toggleSync(e.target.checked)} 
                    /* defaultChecked="true" */
                />
                Sincro
            </label>
        </span>
    );
}

export default DesynchronizeScroll;