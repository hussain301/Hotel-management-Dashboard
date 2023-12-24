import styled, { keyframes } from 'styled-components';

// Define the keyframes for the loader animation
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

// Define the keyframes for the color change animation
const colorChange = keyframes`
  0% { background-color: #ff0000; }
  33% { background-color: #00ff00; }
  66% { background-color: #0000ff; }
  100% { background-color: #ff0000; }
`;

// Define the Dot styled-component
const Dot = styled.div`
  background-color: #333;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 3em 0.2em;
  animation: ${bounce} 1.4s infinite ease-in-out both,
              ${colorChange} 1.4s infinite;
`;

// Define the Loader styled-component
const Loader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 3em;
  height: 1em;

  ${Dot}:nth-child(1) { animation-delay: -0.32s; }
  ${Dot}:nth-child(2) { animation-delay: -0.16s; }
`;

export default function ThreeDotLoader() {
  return (
    <Loader>
      <Dot />
      <Dot />
      <Dot />
    </Loader>
  );
}