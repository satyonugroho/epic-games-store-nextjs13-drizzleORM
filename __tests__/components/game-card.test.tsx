import { render, screen } from '@testing-library/react'
import { GameCard } from '@/components/game-card'

describe('GameCard', () => {
    const mockGame = {
        id: '1',
        title: 'Test Game',
        description: 'Test Description',
        image: '/test.jpg'
        // Remove price field from test data
    }

    it('renders game information', () => {
        render(<GameCard game={mockGame} onAcquire={() => { }} />)

        expect(screen.getByText('Test Game')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent('Get Game')
        // Remove price-related assertions
    })

    // Remove price-related test cases
    // ...existing code...
})
