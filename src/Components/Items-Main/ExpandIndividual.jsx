import expandRight from './icons/expand-right.svg'
import collapseRight from './icons/collapse-right.svg'
import expandLeft from './icons/expand-left.svg'
import collapseLeft from './icons/collapse-left.svg'

const ExpandLeft = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={collapseRight} alt='collapse icon' style={{transform: 'rotate(540deg)', transition: 'transform .4s'}} /> : <img src={expandLeft} alt='expand icon' style={{transition: 'transform .4s'}}/>}
    </span>
);

const ExpandRight = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={collapseLeft} alt='collapse icon' style={{transform: 'rotate(-540deg)', transition: 'transform .4s'}} /> : <img src={expandRight} alt='expand icon' style={{transition: 'transform .4s'}}/>}
    </span>
);

export { ExpandLeft, ExpandRight }