// style sheet
import styled from "styled-components";

export const colorPallet = {
  bg: '#1f2029',
  bgLight: '#2c2e3d',
  bgDark: '#1a1b23',
  text: '#c4c3ca',
  linkText: '#c4c3ca',
  point: '#ffeba7',
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InputText = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: ${colorPallet.bg};
  &:placeholder-shown {
    color: ${colorPallet.text};
  }
`;

export const Button = styled.button``;

export const FormWrapper = styled.div`
  background-color: ${colorPallet.bgLight};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.375rem;
  gap: 1rem;
  transition: opacity 0.3s ease-in-out;
`;

export const SubmitButton = styled.button`
--tw-bg-opacity: 1;
background-color: rgb(59 130 246 / var(--tw-bg-opacity));
color: #FFF;
width: 100%;
border: none;
border-radius: 0.375rem;
padding: 1rem;
font-size: 1rem;
font-weight: 700;
cursor: pointer;
transition: all 0.3s ease-in-out;
&:hover {
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}

@media (min-width: 640px) {
  &:active {
    background-color: rgb(29 78 216 / var(--tw-bg-opacity));
  }
}
`;