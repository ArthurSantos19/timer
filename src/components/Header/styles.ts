import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
    
    a {
      width: 3rem;
      right: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: white;

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid green;
      }

      &.active {
        color: green;      
      }
    }
  }
`