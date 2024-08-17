'use client';

import React, { TextareaHTMLAttributes } from 'react';
import {
  Box,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { capitalizeFirstLetter } from '@/utils/system.util';

type Variant = 'filled' | 'outlined';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  formRef?: UseFormRegister<FieldValues>;
  loading?: boolean;
  variant?: 'filled' | 'outlined';
  isFormat?: boolean;
}

export const TextAreaField: React.FC<TextAreaProps> = ({
  label,
  error,
  formRef,
  loading,
  className,
  variant = 'filled',
  isFormat = false,
  required,
  ...props
}: TextAreaProps) => {
  const option = formRef ? { ...formRef(props.name || '') } : {};

  return (
    <Box className={`flex flex-col gap-[0.8rem] w-full ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <Label>
            {label}
            {required && <span className="font-bold text-[#F45647]"> *</span>}
          </Label>
        )}
        {error && (
          <ErrorTooltip title={capitalizeFirstLetter(error)} placement="left">
            <HelpIcon
              className="cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
              src="/icons/error-help-icon.svg"
            />
          </ErrorTooltip>
        )}
      </div>
      {loading ? (
        <SkeletonInputField variant={variant} />
      ) : (
        <TextArea
          className={`custom-textarea ${error && 'error'} ${variant}`}
          variant={variant}
          {...option}
          {...props}
          rows={4} // Default number of rows
        />
      )}
    </Box>
  );
};

export const SkeletonInputField = (props: { variant?: Variant }) => (
  <div className="animate-pulse">
    <div
      className={`${
        props.variant === 'outlined' ? 'h-[4rem]' : 'h-[3rem]'
      } bg-gray-500 rounded skeleton`}
    ></div>
  </div>
);

export const Label = styled('label')`
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.tColor[400]};
  white-space: nowrap;
`;

export const HelpIcon = styled('img')`
  width: 18px;
  height: auto;
`;

const TooltipWrapper = styled(Tooltip)``;

export const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <TooltipWrapper {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#eb5946e1',
    boxShadow: '0 0 3rem 0rem rgba(0, 0, 0, 0.08)',
    color: '#fff',
    fontSize: '1.4rem',
    fontWeight: 400,
    borderRadius: '0.4rem',
    overFlow: 'hidden',
    maxWidth: '20rem',
  },
}));

export const TextArea = styled<any>('textarea')`
  ${(props) =>
    props.variant === 'outlined'
      ? `border: 1px solid; padding: 1.1rem; border-radius: 0.8rem;`
      : 'border: none; border-bottom: 1px solid; padding: 0.5rem 0;'}

  padding: 1.1rem;
  border-radius: 0.8rem;
  border-color: ${(props) => props.theme.palette.tColor[200]};
  outline: none;
  width: 100%;
  font-size: 1.8rem;
 
  resize: vertical; // Allows the user to resize the textarea vertically
  background-color: ${(props) =>
    props.variant === 'filled' ? 'transparent' : 'rgba(255, 255, 255, 0.10)'};
  color: ${(props) => props.theme.palette.tColor[0]};
  &::placeholder {
    color: ${(props) => props.theme.palette.tColor[300]};
  }
  &:hover {
    border-color: ${(props) => props.error || props.theme.palette.tColor[400]};
  }
  &:focus {
    border-color: ${(props) => props.theme.palette.tColor[400]};
  }
  &.error {
    border-color: #eb5a46;
  }
`;
