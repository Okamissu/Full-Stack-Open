import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Form = styled.form`
  max-width: 460px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  margin-block: 1rem 1.5rem;
  box-shadow: var(--shadow);
`

export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 360px;
  border: 1px solid #d1d5db;
  border-radius: var(--radius);
  padding: 0.65rem 0.8rem;
  font-size: 1rem;
  margin-block: 0.35rem 0.75rem;
  background: white;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px var(--primary-light);
    outline: none;
  }
`

export const Button = styled.button`
  background-color: var(--surface);
  color: var(--primary);
  border: 1px solid var(--border);
  padding: 0.5rem 1.15rem;
  border-radius: var(--radius);
  cursor: pointer;
  box-shadow: var(--shadow);

  &:hover {
    background-color: #eef2ff;
    color: var(--primary-dark);
  }
`

export const Label = styled.label`
  display: block;
  margin-top: 0.75rem;
  font-weight: 600;
  color: var(--text);
`

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.6rem;
  gap: 0.6rem;
  margin: 0;
  margin-bottom: 1.2rem;
  background-color: var(--primary);
`

export const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  min-height: 2.4rem;
  padding: 0.4rem 1.1rem;
  text-decoration: none;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  min-height: 2.4rem;
  padding: 0.4rem 1.1rem;
  text-decoration: none;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export const NotificationBox = styled.div`
  color: ${({ error }) => (error ? 'var(--danger)' : 'green')};

  background: ${({ error }) => (error ? 'var(--danger-bg)' : '#ecfdf5')};

  border: 1px solid
    ${({ error }) => (error ? 'var(--danger-border)' : '#86efac')};

  padding: 0.8rem 1rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
`
