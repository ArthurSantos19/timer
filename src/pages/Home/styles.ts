import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: gray;
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid gray;
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: gray;

  &:focus {
    box-shadow: none;
    border-color: #F0FFF0;
  }

  &::placeholder {
    color: gray;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CoutdownContainer = styled.div`
  font-size: 10rem;
  line-height: 8rem;
  color: gray;

  display: flex;
  gap: 1rem;

  span {
    background: #F0FFF0;
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: white;

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border:0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;


  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

`

export const CountdownButton = styled(BaseCountdownButton)`
  background: #F0FFF0;
  color: gray;

  &:not(:disabled):hover {
    background-color: #90EE90;
    color: white;
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
   background: ${(props) => props.theme['red-500']};
  color: gray;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
    color: white;
  }
`