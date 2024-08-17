'use client';
import { Box, styled } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { capitalizeFirstLetter } from '@/utils/system.util';
import {
  ErrorTooltip,
  HelpIcon,
  Input,
  SkeletonInputField,
} from './InputField';

type Variant = 'filled' | 'outlined';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
  error?: string;
  label?: string;
  control?: Control<FieldValues>;
  loading?: boolean;
  formRef?: UseFormRegister<FieldValues>;
  defaultCountry?: Country;
  variant?:Variant;
}

export const PhoneNumberField: React.FC<Props> = ({
  label,
  error,
  type = 'text',
  formRef,
  control,
  loading,
  defaultCountry = 'FR',
  ...props
}: Props) => {
  const option = formRef ? { ...formRef(props.name || '') } : {};

  return (
    <PhoneNumberFieldWrapper className={`${error && 'error'}`}>
      <div className="flex items-center justify-between">
        {label && <Label>{label}</Label>}
        {error && (
          <ErrorTooltip title={capitalizeFirstLetter(error)} placement="left">
            <HelpIcon
              src="/icons/error-help-icon.svg"
              className="cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
            />
          </ErrorTooltip>
        )}
      </div>
      {loading ? (
        <SkeletonInputField />
      ) : (
        <Box className="relative">
          <Controller
            name={props.name!}
            control={control}
            render={({ field }) => (
              <PhoneInput
                inputComponent={Input}
                defaultCountry={defaultCountry}
                international
                {...props}
                {...option}
                {...field}
                onBlur={(e) => {
                  field.onBlur();
                  props.onBlur && props.onBlur(e as any);
                }}
              />
            )}
          />
        </Box>
      )}
    </PhoneNumberFieldWrapper>
  );
};

const PhoneNumberFieldWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;

  .PhoneInputInput {
    background-color: transparent;
  }

  &.error {
    input {
      border-color: #eb5a46;
    }
  }
`;

export const Label = styled('label')`
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.tColor[400]};
`;
