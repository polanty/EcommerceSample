import { styled } from "styled-components";

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 15rem;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const CartItemMessage = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const CartMessageMessage = styled.h1`
  font-size: 1rem;
`;

export const CartMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// .cart-dropdown-container {
//   position: absolute;
//   width: 15rem;
//   height: 340px;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   border: 1px solid black;
//   background-color: white;
//   top: 90px;
//   right: 40px;
//   z-ex: 5;

//   .empty-message {
//     font-size: 1rem;
//     margin: 50px auto;
//   }

//   .cart-items {
//     height: 240px;
//     display: flex;
//     flex-direction: column;
//     overflow: scroll;
//   }

//   .cart-message-container {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .cart-message-message {
//     font-size: 1rem;
//   }

//   button {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     margin-top: 1rem;
//   }
// }
