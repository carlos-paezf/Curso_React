import { render, screen } from '@testing-library/react'
import ButtonCounter from './ButtonCounter'

describe('<ButtonCounter />', () => {

    const action = jest.fn()

    beforeEach(() => {
        render(<ButtonCounter name="Prueba" value={3} action={action} aria="prueba-aumentar" />)
    })

    it('Snapshot para <ButtonCounter />', () => {
        expect(screen.getByLabelText('prueba-aumentar')).toMatchSnapshot()
    })

    it('Crear un botón correctamente', () => {
        expect(screen.getByLabelText('prueba-aumentar')).toBeInTheDocument()
    })
})
