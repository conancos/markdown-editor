import expandRight from '../assets/icons/expand-right.svg'
import collapseRight from '../assets/icons/collapse-right.svg'
import expandLeft from '../assets/icons/expand-left.svg'
import collapseLeft from '../assets/icons/collapse-left.svg'
import expandFull from '../assets/icons/expand-full.svg'
import collapseArrow from '../assets/icons/collapse-arrow.svg'


const ItemsLeft = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={expandRight} alt='collapse icon' style={{transform: 'rotate(180deg)' }} /> : <img src={expandLeft} alt='expand icon' />}
    </span>
);

const ItemsRight = ({ className, toggleExpand, isExpanded }) => (
    <span className={className} onClick={toggleExpand} role='button' >
        {isExpanded ? <img src={expandLeft} alt='collapse icon' style={{transform: 'rotate(-180deg)' }} /> : <img src={expandRight} alt='expand icon'/>}
    </span>
);

export { ItemsLeft, ItemsRight } 