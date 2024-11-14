import expandFull from './icons/expand-full.svg'
import collapseFull from './icons/collapse-full.svg'



const ExpandFull = ({ className, toggleExpandFull, isExpandedFull }) => (
    <span className={className} onClick={toggleExpandFull} role='button'>
        {isExpandedFull ? <img src={collapseFull} alt='collapse icon' style={{transform: 'rotate(180deg)', transition: 'transform .5s'}} /> : <img src={expandFull} alt='expand icon' style={{transform: 'rotate(-180deg)', transition: 'transform .5s'}} />}
    </span>
);

/* const CollapseFull = ({ className, toggleExpandFull, isExpandedFull }) => (
    <span className={className} onClick={toggleExpandFull} role='button' >
        {isExpandedFull ? <img src={expandFull} alt='collapse icon' style={{transform: 'rotate(-180deg)', transition: 'transform .5s'}} /> : <img src={collapseFull} alt='expand icon' style={{transition: 'transform .5s'}} />}
    </span>
); */

export { ExpandFull, /* CollapseFull */ }