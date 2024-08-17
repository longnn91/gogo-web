"use client";

import { styled } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export const GuestLayoutRouter = ({ children }: Props) => {
  return (
    <GuestLayoutContainer>
      <ContentWrapper>
        <LogoImage src="/images/logo.svg" />
        <BoxContent>{children}</BoxContent>
      </ContentWrapper>
    </GuestLayoutContainer>
  );
};

const GuestLayoutContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("/images/guest-bg-optimize.png");
  background-color: ${(p) => p.theme.palette.bColor[0]};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const LogoImage = styled("img")`
  width: 12rem;
  min-height: 7.7rem;
  height: auto;
`;

const BoxContent = styled("div")`
  border-radius: 2rem;
  border: 1px solid rgba(96, 150, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 3rem 0rem rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(3rem);
`;
