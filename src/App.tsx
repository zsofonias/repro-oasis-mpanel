import styled from 'styled-components';
// import GlobalStyles from './styles/GlobalStyles';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Heading from './components/ui/Heading';
import Row from './components/ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* <GlobalStyles /> */}
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">Hello Oasis</Heading>
          <div>
            <Heading as="h2">Hello Oasis</Heading>
            <Button onClick={() => alert('Check In')}>Check In</Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => alert('Check Out')}
            >
              Check In
            </Button>
          </div>
        </Row>

        <Row type="vertical">
          <Heading as="h3">Hello Oasis</Heading>
          <form>
            <Input type="number" min={1} placeholder="Number of guests" />
            <Input type="number" min={1} placeholder="Number of guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}
export default App;
