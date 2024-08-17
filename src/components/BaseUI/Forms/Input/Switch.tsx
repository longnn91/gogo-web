'use client';

import { styled } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Text } from '@/components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  //   maincolor?: string;
  //   mainsize?: number;
  yesLabel?: string;
  noLabel?: string;
  id: string;
  formRef?: UseFormRegister<FieldValues>;
}

export const Switch = ({
  id = 'switch',
  yesLabel,
  noLabel,
  formRef,
  value,
  ...props
}: Props) => {
  const option = formRef ? { ...formRef(props?.name || '') } : {};

  if (!(yesLabel && noLabel)) {
    return (
      <Wrapper>
        <Input
          type="checkbox"
          id={id}
          checked={!!value}
          {...option}
          {...props}
        />
        <LabelSingleControll htmlFor={id}>
          <SwitchUI className="switch-ui" />
        </LabelSingleControll>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="switch">
      <Input type="checkbox" id={id} {...option} checked={!!value} {...props} />
      <LabelControl htmlFor={id}>
        {noLabel && <Text size="sm">{noLabel}</Text>}
        <SwitchUI className="switch-ui" />
        {yesLabel && <Text size="sm">{yesLabel}</Text>}
      </LabelControl>
    </Wrapper>
  );
};

const Wrapper = styled('div')``;

const Input = styled('input')`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;

  &:checked + label > .switch-ui {
    background: #cc9b12;
  }

  &:checked + label > .switch-ui:after {
    left: calc(100% - 0.2rem);
    transform: translateX(-100%);
  }
`;

const LabelSingleControll = styled('label')`
  .switch-ui {
    transition: all 0.3s;

    &:hover {
      background: ${({ theme }) => theme.palette.tColor[500]};
    }
  }
`;

const LabelControl = styled('label')`
  background-color: ${({ theme }) => theme.palette.bColor[400]};
  border-radius: 50px;
  height: 2.8rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.bColor[600]};
  }
`;

const SwitchUI = styled('div')`
  cursor: pointer;
  text-indent: -9999px;
  width: 2.4rem;
  height: 1.4rem;
  background: ${({ theme }) => theme.palette.tColor[400]};
  display: block;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &:after {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 1rem;
    height: 1rem;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  &:active:after {
    width: 1.3rem;
  }
`;
