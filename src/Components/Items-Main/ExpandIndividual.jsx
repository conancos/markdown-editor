import expandRight from './icons/expand-right.svg'
import collapseRight from './icons/collapse-right.svg'
import expandLeft from './icons/expand-left.svg'
import collapseLeft from './icons/collapse-left.svg'
import expandFull from './icons/expand-full.svg'
import collapseArrow from './icons/collapse-arrow.svg'


const ExpandLeft = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={expandRight} alt='collapse icon' style={{transform: 'rotate(180deg)' }} /> : <img src={expandLeft} alt='expand icon' />}
    </span>
);

const ExpandRight = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={expandLeft} alt='collapse icon' style={{transform: 'rotate(-180deg)' }} /> : <img src={expandRight} alt='expand icon'/>}
    </span>
);

export { ExpandLeft, ExpandRight }