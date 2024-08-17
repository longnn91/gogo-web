"use client";

import styled from "@emotion/styled";

export const LoginView = () => {
  return <LoginViewWrapper>Login View</LoginViewWrapper>;
};

const LoginViewWrapper = styled.div`
  padding: clamp(2rem, 20vw, 3.4rem);
  width: clamp(32rem, 70vw, 53rem);
  display: flex;
  flex-direction: column;
  gap: 20rem;
`;
