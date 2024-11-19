import "./styles/components.css";

const DesynchronizeScroll = ({ isSyncro, toggleSync }) => {
    return (
        <div className="desync-scroll">
            <label>
                <input 
                    type="checkbox" 
                    checked={isSyncro} 
                    onChange={(e) => toggleSync(e.target.checked)} 
                    /* defaultChecked="true" */
                />
                Sincro.
            </label>
        </div>
    );
}

export default DesynchronizeScroll;