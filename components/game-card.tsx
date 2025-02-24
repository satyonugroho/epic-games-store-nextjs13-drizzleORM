import Image from 'next/image'

interface GameCardProps {
    game: {
        id: string;
        title: string;
        description: string;
        image: string;
    };
    onAcquire: (gameId: string) => void;
}

export function GameCard({ game, onAcquire }: GameCardProps) {
    return (
        <div className="card">
            <Image
                src={game.image}
                alt={game.title}
                width={300}
                height={200}
                className="w-full h-auto"
            />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <button
                onClick={() => onAcquire(game.id)}
                className="button primary"
            >
                Get Game
            </button>
        </div>
    )
}
