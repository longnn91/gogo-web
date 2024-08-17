import { capitalizeFirstLetter } from '@/utils/system.util';
import { FormControl, MenuItem, Select, SelectProps } from '@mui/material';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import {
  ErrorTooltip,
  HelpIcon,
  Label,
  SkeletonInputField,
} from './InputField';
import cl from 'classnames';

interface SelectFieldProps extends Omit<SelectProps, 'error'> {
  name: string;
  control: Control<FieldValues>;
  formRef?: UseFormRegister<FieldValues>;
  label: string;
  loading?: boolean;
  options: { value: string; label: string }[];
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'outlined' | 'filled';
  propsOnChange?: (value: string | undefined | number) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  control,
  label,
  options,
  loading,
  error,
  className,
  variant = 'filled',
  required,
  propsOnChange,
  ...props
}) => {
  return (
    <FormControl
      className="flex relative flex-col gap-[0.8rem] w-full"
      error={!!error}
    >
      <div
        className={`flex items-center justify-between ${
          !label && '!justify-end mb-[-1.8rem]'
        }`}
      >
        {label && (
          <>
            <Label>
              {label}
              {required && <span className="font-bold text-[#F45647]"> *</span>}
            </Label>
          </>
        )}
        {error && (
          <ErrorTooltip title={capitalizeFirstLetter(error)} placement="left">
            <HelpIcon
              className="cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out z-10"
              src="/icons/error-help-icon.svg"
            />
          </ErrorTooltip>
        )}
      </div>
      {loading ? (
        <SkeletonInputField variant={variant} />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, ...fieldProps } }) => (
            <Select
              {...fieldProps}
              value={value ?? ''}
              {...props}
              variant={variant}
              onChange={(e) => {
                fieldProps.onChange(e.target.value);
                if (propsOnChange) {
                  propsOnChange(e.target?.value);
                }
              }}
              disabled={props.disabled}
              className={className}
              slotProps={{
                root: {
                  className: cl(
                    'transition-all duration-300 ease-in-out',
                    variant === 'outlined'
                      ? 'bg-[#ffffff1a] rounded-[0.8rem]'
                      : '!bg-transparent hover:bg-transparent !focus:bg-transparent !before:border-red',
                  ),
                },
                input: {
                  className: cl(
                    '!bg-transparent !min-h-0 !text-[1.8rem] text-left',
                    variant === 'outlined'
                      ? '!font-normal !py-[1.5rem] !px-[1.4rem]'
                      : '!font-bold !py-[0.5rem] !h-[2rem] !px-0',
                    {
                      '!cursor-not-allowed ': props.disabled,
                    },
                  ),
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  className="!text-[1.4rem] !font-medium"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      )}
    </FormControl>
  );
};

export default SelectField;
