'use client';

import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

type ButtonColor = 'primary' | 'secondary' | 'transparent';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  loading,
  icon,
  iconPosition = 'left',
  size = 'medium',
  color = 'primary',
  className = '',
  ...props
}: Props) => {
  return (
    <Wrapper className={`custom-button ${className}`} size={size} color={color}>
      <ButtonWrapper {...props} size={size} color={color}>
        <ButtonText className={loading ? 'loading' : ''}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </ButtonText>
        {loading && <LoadingAnimation size="20px" color="inherit" />}
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled<any>('div')`
  display: flex;
  height: ${({ size }) => sizeHeightStyles[size as ButtonSize]};
  overflow: hidden;
  width: fit-content;
  border: 1px solid
    ${(props) =>
      props.color === 'primary'
        ? 'rgb(204, 155, 18, 0.3)'
        : 'rgba(255, 255, 255, 0.40)'};
  border-radius: 50rem;
`;

const ButtonText = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.4s ease-in-out;
  &.loading {
    color: transparent;
  }
`;

const LoadingAnimation = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  color: ${(props) => props.theme.palette.tColor[0]};
`;

export const sizeHeightStyles: Record<ButtonSize, string> = {
  large: '5.6rem',
  medium: '4.6rem',
  small: '3.3rem',
};

export const sizeTextStyles: Record<ButtonSize, string> = {
  large: '2rem',
  medium: '1.6rem',
  small: '1.3rem',
};

export const sizeWeightStyles: Record<ButtonSize, string> = {
  large: '700',
  medium: '700',
  small: '500',
};

const sizePaddingStyles: Record<ButtonSize, string> = {
  large: '0 4rem',
  medium: '0 2.4rem',
  small: '0 1.6rem',
};

const ButtonWrapper = styled<any>('button')`
  position: relative;
  padding: ${({ size }) => sizePaddingStyles[size as ButtonSize]};
  font-size: ${({ size }) => sizeTextStyles[size as ButtonSize]};
  font-weight: ${({ size }) => sizeWeightStyles[size as ButtonSize]};
  color: ${(props) => props.theme.palette.tColor[0]};
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 50rem;
  border: none;
  height: 100%;

  background-image: ${(props) =>
    props.color === 'primary'
      ? `linear-gradient(
        270deg,
        ${props.theme.palette.pColor[0]} -0.2%,
        rgba(204, 155, 18, 0.1) 99.8%
      )`
      : 'var(--Status-White-10-60, linear-gradient(270deg, rgba(255, 255, 255, 0.60) -0.2%, rgba(255, 255, 255, 0.10) 99.8%))'};
  background-size: 100% 100%;
  background-color: var(
    --Status-White-10-60,
    linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.6) -0.2%,
      rgba(255, 255, 255, 0.1) 99.8%
    )
  );
  transition: all 0.4s ease-in-out;

  ${(props) => props.theme.breakpoints.down('sm')} {
    //font-size: 1.4rem;
    padding: 0rem 1.6rem;
  }

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
