import logo from './logo.svg';
import './App.css';
import Pricer from './components/Pricer.js';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: #e6f1f8;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
`;

function App() {
  return (
    <StyledDiv>
      <h1>Public Claims To Payment Dataset</h1>
      <h2>Purpose</h2>
      <p>It is difficult to determine what an insurer will pay for a given medical claim.</p>
      <p>A dataset of example claims and what the payment would be for each
    claim would resolve this issue. For claims that are represented in the
    dataset, it would be possible to immediately determine what the insurer
    would pay for that claim.  New applications could be built on top of this
    capability that were previously impossible.</p>
      <h2>Dataset Format</h2>
      <p>A CSV-compatible Excel file (i.e. no special Excel features) with
    example claims and what they would pay.</p>
      <h2>Dataset Scope</h2>
      <p>The dataset would not initially be able to represent all claims. The
    work of increasing the representation percentage should be iterative. More
    complex claims would fall back to the existing process of waiting for a full
    response from the insurer.</p>
      <h2>Policy and Testing</h2>
      <p>The insurer must guarantee that if a case matches a case in the example
    dataset, the price in that dataset is actually what will be paid after the
    full process.</p>
      <p>This can be implemented by submitting the example claims into the full
    claims processing system, and verifying that the prices returned match the
    prices that are published. If this is not the case, there is a software
    issue that must be fixed.</p>
    <h2>Possible Applications</h2>
    <p>If this dataset existed online, it would be possible for someone to build
    a website and an API that instantly returns what the payment would be for a
    claim.</p>
    <p>Because no data would need to be stored to support this website and
    API, this could be built using a very simple architecture. For example,
    building an API that can support millions of requests per month would cost
    on the order of magnitude of $100 per month.</p>
    <p>With these tools, any application that helped with billing management
    could be built with confidence, and instantly return the relevant
    information needed to make financial decisions.</p>
    <h2>Pricer Website Example</h2>
    <p>This pricer website example was made in a couple hours, is hosted for
    free as a static website, and shows the functionality that could be
    implemented with this dataset:</p>
    <Pricer />
    </StyledDiv>
  );
}

export default App;

