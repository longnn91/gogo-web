"use client";

import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ButtonSize,
  sizeHeightStyles,
  sizeTextStyles,
  sizeWeightStyles,
} from "./Button";

interface Props extends ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: ButtonSize;
}

export const ButtonOutline = ({ children, icon, loading, ...props }: Props) => {
  return (
    <Wrapper
      className="custom-button-outline"
      {...props}
      size={props.size || "medium"}
    >
      {icon}
      <ButtonText className={`${loading && "loading"}`}>{children}</ButtonText>
      {loading && <LoadingAnimation size="20px" color="inherit" />}
    </Wrapper>
  );
};

const Wrapper = styled(MuiButton)`
  position: relative;
  display: flex;
  gap: 1rem;
  border: 1px solid ${(props) => props.theme.palette.tColor[300]};
  border-radius: 5rem;
  background-color: transparent;
  padding: 0px 4rem;
  transition: all 0.4s;
  font-size: ${({ size }) => sizeTextStyles[size as ButtonSize]};
  font-weight: ${({ size }) => sizeWeightStyles[size as ButtonSize]};
  height: ${({ size }) => sizeHeightStyles[size as ButtonSize]};
  text-transform: none;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const ButtonText = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.palette.tColor[100]};
  gap: 1rem;
  transition: all 0.4s ease-in-out;

  &.loading {
    color: transparent;
  }
`;

const LoadingAnimation = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  color: ${(props) => props.theme.palette.tColor[300]};
`;
