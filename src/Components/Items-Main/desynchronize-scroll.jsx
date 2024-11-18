
import "./styles/components.css";


const DesynchronizeScroll = ({ isSynced, toggleSync }) => {
    return (
        <div className="desync-scroll">
            <label>
                <input 
                    type="checkbox" 
                    checked={isSynced} 
                    onChange={(e) => toggleSync(e.target.checked)} 
                    /* defaultChecked="true" */
                />
                Sincro.
            </label>
        </div>
    );
}

export default DesynchronizeScroll;