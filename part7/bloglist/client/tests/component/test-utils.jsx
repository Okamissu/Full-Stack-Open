// test-utils.jsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

export { renderWithRouter }
