import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`

export const Form = styled.form`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  max-width: 460px;
  padding: 1rem;
`

export const Input = styled.input`
  display: block;
  width: 100%;
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

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #eef2ff;
    color: var(--primary-dark);
    transform: translateY(-1px);
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
  gap: 0.6rem;
  align-items: center;

  padding: 0.5rem 0.6rem;
  background: var(--primary);
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
`

const NavItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  min-height: 2.4rem;
  padding: 0.4rem 1.1rem;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export const NavLink = styled(NavItem)``
export const NavButton = styled(NavItem)``

export const NotificationBox = styled.div`
  color: ${({ $error }) => ($error ? 'var(--danger)' : 'var(--info)')};

  padding: 1rem;

  margin-bottom: 1rem;

  background: ${({ $error }) =>
    $error ? 'var(--danger-bg)' : 'var(--info-bg)'};

  border: 1px solid
    ${({ $error }) => ($error ? 'var(--danger-border)' : 'var(--info-border)')};
`

export const BlogCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--text);
  padding: 1rem 1.1rem;
  font-size: 0.95rem;
  margin-block: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: var(--primary-light);
    transform: translateY(-1px);
  }
`

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: var(--text);

  &:hover {
    color: var(--primary);
  }
`

export const BlogTitle = styled.h3`
  color: var(--primary);
  margin-top: 0.5rem;
  margin-bottom: 0;
`

export const BlogButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const BlogButton = styled(Button)`
  padding: 0.35rem 0.8rem;
  font-size: 0.85rem;
`
