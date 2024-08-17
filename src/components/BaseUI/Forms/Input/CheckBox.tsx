'use client';

import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup as MuiFormGroup,
  styled,
} from '@mui/material';
import {
  Control,
  FieldValues,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

interface Props extends CheckboxProps {
  maincolor?: string;
  mainsize?: number;
  label?: string;
  formRef?: UseFormRegister<FieldValues>;
  control?: Control<FieldValues>;
  name?: string;
}

export const CheckBox = ({ label, formRef, name, ...props }: Props) => {
  const checked = useWatch({
    control: props?.control,
    name: name as string,
    defaultValue: props?.defaultChecked, // default value if needed
  });

  const option = formRef ? { ...formRef(name || '') } : {};

  return (
    <FormGroup className="form-group-checkbox">
      <FormControlLabel
        control={<CheckboxWrapper {...option} checked={!!checked} {...props} />}
        label={label}
        slotProps={{
          typography: {
            className: '!text-white !text-[1.6rem]',
          },
        }}
      />
    </FormGroup>
  );
};

const FormGroup = styled(MuiFormGroup)`
  margin-left: unset;
  margin-right: unset;
  .MuiFormControlLabel-label {
    font-size: 14px;
    user-select: none;
  }
  .MuiFormControlLabel-root {
    margin-left: unset;
    margin-right: unset;
  }
`;

const CheckboxWrapper = styled(MuiCheckbox)<Props>`
  color: ${(p) => p.theme.palette.tColor[0]};

  &.MuiCheckbox-root {
    padding: 0px;
    margin-right: 6px;

    .MuiSvgIcon-root {
      width: ${(p) => p?.mainsize || 2.4}rem;
      height: ${(p) => p?.mainsize || 2.4}rem;
      fill: ${(p) => p.theme.palette.pColor[0]};
    }
  }
  &.Mui-checked {
    color: ${(p) => p.theme.palette.tColor[0]};

    .MuiSvgIcon-root {
      fill: ${(p) => p.theme.palette.pColor[0]};
    }
  }
  &.Mui-disabled {
    .MuiSvgIcon-root {
      fill: rgba(0, 0, 0, 0.38);
    }
  }
`;
