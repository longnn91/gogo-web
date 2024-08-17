import { capitalizeFirstLetter } from '@/utils/system.util';
import { FormControl } from '@mui/material';
import cls from 'classnames';
import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { ErrorTooltip, HelpIcon, Label } from './InputField';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  control?: Control;
  type?: 'primary' | 'secondary';
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  loading?: boolean;
  propsOnChange?: (...event: any[]) => void;
  defaultValue?: string | number;
  className?: string;
  extraText?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  control,
  label,
  type = 'primary',
  required,
  error,
  loading,
  propsOnChange,
  defaultValue,
  className,
  extraText,
  ...props
}) => {
  const { control: ownControl, watch } = useForm<any>({
    defaultValues: {
      [name]: defaultValue || options[0].value,
    },
  });

  return (
    <FormControl
      className={`flex flex-col gap-[0.8rem] ${className} `}
      error={!!error}
    >
      <div className="flex items-center justify-between">
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
              className="cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
              src="/icons/error-help-icon.svg"
            />
          </ErrorTooltip>
        )}
      </div>
      {loading ? (
        <div className="flex">
          {options.map((item) => (
            <div
              className="w-[7.8rem] h-[4.6rem] rounded-full animate-pulse bg-gray-500 full skeleton selector mr-2 border-2 border-solid border-gray-500 p-4 "
              key={item.value}
            />
          ))}
        </div>
      ) : (
        <Controller
          name={name}
          control={control || ownControl}
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <div
              className={cls('flex', {
                'bg-white rounded-full p-2 bg-opacity-10 items-center ':
                  type === 'secondary',
              })}
            >
              {extraText && <span className='px-4' >{extraText}</span>}
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cls(
                    `flex whitespace-nowrap font-medium text-[1.3rem] pr-[1.4rem] items-center border border-solid border-white rounded-full ${
                      value === option.value
                        ? 'text-white bg-white bg-opacity-10'
                        : 'text-gray-400 hover:border-opacity-25 border-opacity-15'
                    } ml-4 first:ml-0 cursor-pointer transition-all duration-300`,
                    {
                      'p-[0.5rem]': type === 'secondary',
                      'p-[1rem]': type === 'primary',
                    },
                  )}
                >
                  <input
                    {...fieldProps}
                    {...props}
                    onChange={(e) => {
                      if (propsOnChange) {
                        propsOnChange(e.target?.value);
                      }
                      return onChange(e);
                    }}
                    type="radio"
                    value={option.value}
                    className="sr-only "
                  />
                  <div
                    className={`selector rounded-full mr-2 border-[2px] flex items-center justify-center  border-solid border-gray-500 h-[20px] w-[20px] ${
                      value === option.value && 'border-white'
                    } `}
                  >
                    {value === option.value && (
                      <span className=" bg-white h-[12px] w-[12px] rounded-full "></span>
                    )}
                  </div>
                  {option.label}
                </label>
              ))}
            </div>
          )}
        />
      )}
    </FormControl>
  );
};

export default RadioGroup;
