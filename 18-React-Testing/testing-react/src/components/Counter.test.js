import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('<Counter />', () => {
    it('Titulo y estado renderizan correctamente', () => {
        render(<Counter />)
        expect(screen.getByText("Counter: 0").tagName).toBe("H2")
    })
    
    it('1 + 1 no es 3', () => {
        expect(1+1).not.toBe(3)
    })

    it('Verificar botón +1', () => {
        render(<Counter />)
        const btn = screen.getByText('Aumentar +1')
        fireEvent.click(btn)
        expect(screen.getByTestId('counter').textContent).toContain('Counter: 1')
    })

    it('Verificar botón -1', () => {
        render(<Counter />)
        userEvent.click(screen.getByLabelText('disminuir'))
        expect(screen.getByRole('counter').textContent).toContain('Counter: -1')
    })

    it('Simular una interacción múltiple del usuario', () => {
        render(<Counter />)
        const btnAum = screen.getByText('Aumentar +1')
        const btnDis = screen.getByLabelText('disminuir')

        userEvent.click(btnAum)
        userEvent.click(btnAum)
        userEvent.click(btnAum)
        userEvent.click(btnAum)
        userEvent.click(btnAum)
        userEvent.click(btnAum)
        userEvent.click(btnAum)
        
        expect(screen.getByRole('counter').textContent).toContain('Counter: 7')

        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)
        userEvent.click(btnDis)

        expect(screen.getByRole('counter').textContent).toContain('Counter: -4')

    })

    it('Verificar botón de reset', () => {
        render(<Counter />)
        const btnAum = screen.getByText('Aumentar +1')

        userEvent.click(btnAum)
        userEvent.click(btnAum)

        userEvent.click(screen.getByLabelText('reset'))
        
        expect(screen.getByRole('counter').textContent).toContain('Counter: 0')

    })
})

