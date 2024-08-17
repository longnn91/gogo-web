"use client";

import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export const GuestLayoutRouter = ({ children }: Props) => {
  return <GuestLayoutContainer>{children}</GuestLayoutContainer>;
};

const GuestLayoutContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;
