import styled from 'styled-components'

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
