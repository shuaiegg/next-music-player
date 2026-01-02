import { Card } from '@/lib/types';

interface CardProps {
    card: Card;
    onclick: (card: Card) => void;
}

const CardItem = ({ card, onclick }: CardProps) => {
    return (
        <div className="card items-center" onClick={() => onclick(card)}>
            
            
            <div className={`card-front p-4 `}>
                {card.isFlipped ? card.value : "?" }
            </div> 

            {/* <div className={`card-back ${card.isFlipped ? "opacity-100" : "opacity-0"}`}>
                {card.value}
            </div> */}
        </div>
    );
}

export default CardItem;