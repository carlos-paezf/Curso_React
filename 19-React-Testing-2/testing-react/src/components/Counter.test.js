import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('<Counter />', () => {

    beforeEach(() =>{
        render(<Counter />)
    })

    it('Primer Snapshots', () => {
        expect(screen.getByRole('counter')).toMatchSnapshot()
    })
    
})

