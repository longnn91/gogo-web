"use client";

import { styled } from "@mui/material";
import { LoginForm } from "./components/LoginForm";

export const LoginView = () => {
  return (
    <LoginViewWrapper>
      <LoginForm />
    </LoginViewWrapper>
  );
};

const LoginViewWrapper = styled("div")`
  padding: clamp(2rem, 20vw, 3.4rem);
  width: clamp(32rem, 70vw, 53rem);
  display: flex;
  flex-direction: column;
  gap: 20rem;
`;
