import styled from "styled-components"

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