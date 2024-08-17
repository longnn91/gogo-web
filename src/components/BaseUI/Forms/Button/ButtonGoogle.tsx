"use client";

import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export const ButtonGoogle: React.FC<Props> = ({
  children,
  loading,
  ...props
}: Props) => {
  return (
    <Wrapper className="custom-button">
      <ButtonWrapper {...props}>
        <ButtonText className={loading ? "loading" : ""}>
          {<Image src={"/icons/gg.svg"} width={20} height={20} alt="gg" />}
          {children}
        </ButtonText>
        {loading && <LoadingAnimation size="20px" color="inherit" />}
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  width: fit-content;
`;

const ButtonText = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.4s ease-in-out;
  &.loading {
    color: transparent;
  }
`;

const LoadingAnimation = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  color: white;
`;

const ButtonWrapper = styled("button")`
  position: relative;
  padding: 0 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 4.6rem;
  width: 100%;
  text-align: center;
  border: none;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0.6) -0.2%,
    rgba(255, 255, 255, 0.1) 99.8%
  );
  background-size: 100% 100%;

  ${(props) => props.theme.breakpoints.down("sm")} {
    /* font-size: 1.4rem; */
    padding: 0px 1.6rem;
  }

  border-radius: 5rem;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-size: 150% 100%;
  }
  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
