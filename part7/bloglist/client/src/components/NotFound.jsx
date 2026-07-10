import { ErrorCard, Button, LinkButton } from '../styles'

const NotFound = () => (
  <ErrorCard>
    <h2>404 - Page not found!</h2>
    <p>Click the button below to return to the main page.</p>
    <LinkButton to="/">Main page</LinkButton>
  </ErrorCard>
)

export default NotFound
