import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/fr';
import {
  ErrorTooltip,
  HelpIcon,
  Label,
  SkeletonInputField,
} from './InputField';
import { capitalizeFirstLetter } from '@/utils/system.util';
import cl from 'classnames';

dayjs.extend(utc);
// dayjs.extend(localizedFormat);
// dayjs.locale('fr');

interface DatePickerProps {
  name: string;
  control: Control<FieldValues>;
  label: string;
  loading?: boolean;
  error?: string;
  format?: 'DD/MM/YYYY' | 'MM/YYYY';
  disabled?: boolean;
  required?: boolean;
  variant?: 'outlined' | 'filled';
}

const DateInputField: React.FC<DatePickerProps> = ({
  name,
  control,
  label,
  loading,
  error,
  disabled,
  required,
  format = 'MM/YYYY',
  variant = 'filled',
  ...props
}) => {
  const theme = createTheme({
    systemStatus: {},

    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '20px',
            color: 'white',
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          input: {
            backgroundColor: '#ffffff1a',
            fontSize: '16px',
            color: 'white',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            border: 'red',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff1a',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: !!error ? '#eb5a46 !important' : 'white',
              opacity: !!error ? 1 : 0.3,
              transition: 'opacity 0.3s',
            },

            '&:hover fieldset': {
              opacity: 1,
              borderColor: !!error ? '#eb5a46' : 'white !important',
            },
          },
          input: {
            fontSize: '16px',
            color: 'white',
            padding: '0px 9px',
            height: '40px',
          },
        },
      },
    },
  });

  return (
    <FormControl
      className={cl(
        'date-input-field flex relative flex-col gap-[0.8rem] w-full',
        {
          'Mui-error': !!error,
        },
      )}
    >
      <style>
        {`
          .MuiPickersDay-root {
            font-size: 1.5rem;
            color: white;
            background-color: transparent;
            transition: all linear 0.2s;
          }
          .MuiPickersDay-root:hover {
            
            border: solid 1px white !important;

          }
          .MuiInputBase-root.Mui-disabled{

          background: rgba(204, 155, 18, 0.16);
          cursor: not-allowed;
          border-color: rgb(255 255 255 / 30%) !important;
          }

            

          .MuiPickersDay-root.Mui-selected{
            background-color: #CC9B12 !important;
          }
          .PrivatePickersYear-yearButton.Mui-selected{
            background-color: #CC9B12 !important;
            color:white;
            font-size:16px;
          }

          .PrivatePickersYear-yearButton{
            color:white;
            font-size:16px;
          }

          .PrivatePickersMonth-root.Mui-selected{
            background-color: #CC9B12 !important;
            color:white;
            font-size:16px;
          }

          .PrivatePickersMonth-root{
            color:white;
            font-size:16px;
            text-transform: capitalize;

          }


          .PrivatePickersMonth-root:hover{
            border: solid 1px white !important;

          }

          .PrivatePickersYear-yearButton:hover{
            border: solid 1px white !important;
          }

          .MuiPickersDay-today{
            border: solid 1px white !important;
          }

          .MuiPickersCalendarHeader-label{
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            text-transform: capitalize;
          }
          .MuiDayPicker-weekDayLabel {
            color: #ffffff67;
            font-size: 1.6rem;
            font-weight: 700;
          }

          .MuiCalendarPicker-root {
            background-color: #373737;
          }
          .MuiDialogActions-root {
            background-color: #373737; 
          }

          .MuiDialogActions-root button {
            color: white;
            font-size:14px;
            border-radius:8px;
            height:30px;
            padding:0px;
            border: solid 0.1px #CC9B12;
            padding:4px 6px;
          }

          .MuiDialogActions-root button:hover {
              background-color:#CC9B12 !important;
              border: solid 0.5px white;
          }
        

          .MuiCalendarPicker-weekDayLabel {
            border-radius: 12px;
          }
          
        `}
      </style>

      <div
        className={`flex items-center justify-between ${
          !label && '!justify-end'
        }`}
      >
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
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            localeText={{
              clearButtonLabel: 'Effacer',
              todayButtonLabel: 'Aujourd’hui',
            }}
            dateAdapter={AdapterDayjs}
            adapterLocale={'fr'}
          >
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value, ref, ...fieldProps } }) => (
                <DatePicker
                  className="date-picker"
                  views={
                    format === 'MM/YYYY'
                      ? ['month', 'year']
                      : ['year', 'month', 'day']
                  }
                  inputFormat={format}
                  disabled={disabled}
                  value={value || null}
                  onChange={(value) => {
                    onChange(dayjs(value).utcOffset(0, true).format());
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...fieldProps}
                      disabled={disabled}
                      variant={variant}
                      error={!!error}
                      inputProps={{
                        ...params.inputProps,
                        placeholder:
                          format === 'MM/YYYY' ? 'mm/aaaa' : 'jj/mm/aaaa',
                      }}
                    />
                  )}
                  componentsProps={{
                    actionBar: { actions: ['clear', 'today'] },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </ThemeProvider>
      )}
    </FormControl>
  );
};

export default DateInputField;
