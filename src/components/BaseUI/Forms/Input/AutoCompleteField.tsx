'use client';
import React from 'react';
import {
  TextField,
  FormControl,
  MenuItem,
  Autocomplete as MUIAutocomplete,
} from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';
import {
  ErrorTooltip,
  HelpIcon,
  Label,
  SkeletonInputField,
} from './InputField';
import { capitalizeFirstLetter } from '@/utils/system.util';

interface PlaceOption {
  value: string;
  label: string;
}

interface AutoCompleteFieldProps {
  name: string;
  control: Control<FieldValues>;
  label: string;
  loading?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'outlined' | 'filled';
  type?: 'round';
  customInput?: string;
  handleClear?: () => void;
  options: Array<{ value: string; label: string; dataRecord?: any }>;
  IconLabel?: React.ReactNode;
  onChange?: (...event: any[]) => void;
  shape?: 'circle' | 'square';
}

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  name,
  control,
  label,
  loading,
  error,
  variant = 'filled',
  type,
  required,
  disabled,
  options,
  handleClear,
  customInput,
  IconLabel,
  className,
  onChange,
  shape = 'circle',
  ..._props
}) => {
  return (
    <FormControl
      className="flex relative flex-col gap-[0.8rem] w-full"
      error={!!error}
    >
      <div className="flex items-center justify-between">
        {label && (
          <>
            <Label className="flex items-center justify-center">
              {label}
              {required && (
                <span className="font-bold mr-3 text-[#F45647]"> *</span>
              )}

              {IconLabel}
            </Label>
          </>
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
        <Controller
          name={name}
          control={control}
          render={({ field: { value, ...props } }) => {
            const defaultValue = options.find((item) => item.value === value);

            return (
              <MUIAutocomplete
                {...props}
                value={defaultValue || options[0]}
                {..._props}
                disabled={disabled}
                options={[...options]}
                getOptionLabel={(option) => option.label || ''}
                onChange={(e, data) => {
                  if (data && data.value !== undefined) {
                    props.onChange(data.value);
                    onChange && onChange(data.value, data);
                  } else {
                    props.onChange(null);
                  }
                }}
                renderOption={(props, option) => {
                  return (
                    <MenuItem
                      {...props}
                      className="!text-[1.6rem] !font-medium overflow-x-hidden "
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    className={className}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '4.4rem',
                        borderRadius: shape === 'circle' ? '50px' : '8px',
                        background:
                          shape === 'circle'
                            ? 'transparent'
                            : 'rgba(255,255,255,0.1)',
                      },
                      '& .MuiInputBase-input': {
                        fontWeight: 400,
                        fontSize: '16px',
                        transform: 'translateY(-8px)',
                      },
                      '& .MuiAutocomplete-endAdornment': {
                        transform: 'translateY(6px)',
                      },
                    }}
                  />
                )}
              />
            );
          }}
        />
      )}
    </FormControl>
  );
};

export default AutoCompleteField;
