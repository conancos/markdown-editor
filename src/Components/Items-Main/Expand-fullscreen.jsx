import expandFull from './icons/expand-full.svg'
import collapseFull from './icons/collapse-full.svg'


const ExpandFull = ({ className, toggleExpandFull, isExpandedFull }) => (
    <span className={className} onClick={toggleExpandFull} role='button'>
        {isExpandedFull ? <img src={collapseFull} alt='collapse icon' style={{transform: 'rotate(180deg)', transition: 'transform .4s'}} /> : <img src={expandFull} alt='expand icon' style={{transform: 'rotate(-180deg)', transition: 'transform .4s'}} />}
    </span>
);


export { ExpandFull }