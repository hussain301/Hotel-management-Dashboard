import styled from "styled-components";

const Input = styled.input`
  padding: .8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  outline: none;
  transition: 0.3s ease-in-out;
  &:focus {
    border-color: #00ff7f;
  }
`;

export default Input