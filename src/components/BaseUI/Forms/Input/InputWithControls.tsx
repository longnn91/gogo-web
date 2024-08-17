import { PlusIcon } from '@/constants/svg/PlusIcon';
import { SubtractIcon } from '@/constants/svg/SubtractIcon';
import React, { useEffect, useState } from 'react';

type Props = {
  defaultValue: number;
  onChangeInput: (value: number) => void;
  step?: number;
  name?: string;
};

const InputWithControls = ({
  defaultValue = 0,
  onChangeInput,
  step = 0.25,
  name,
}: Props) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleSubtract = () => {
    if (inputValue > -100) {
      const newValue = Math.max(inputValue - step, -100);
      setInputValue(newValue);
      if (onChangeInput) onChangeInput(newValue);
    }
  };

  const handleAdd = () => {
    if (inputValue < 100) {
      const newValue = Math.min(inputValue + step, 100);
      setInputValue(newValue);
      if (onChangeInput) onChangeInput(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue);
    if (onChangeInput) onChangeInput(newValue);
  };

  return (
    <>
      <span
        onClick={handleSubtract}
        className=" bg-main hover:bg-opacity-80 h-7 w-7 rounded-full flex bg-opacity-40 items-center justify-center cursor-pointer"
      >
        <SubtractIcon height={14} width={14} />
      </span>
      <input
        type="number"
        value={inputValue}
        min={-100}
        max={100}
        step={step}
        name={name}
        id={name}
        onChange={handleChange}
        className="text-center bg-transparent outline-none border-none text-white max-w-[4rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span
        onClick={handleAdd}
        className=" bg-main hover:bg-opacity-80 bg-opacity-40 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer"
      >
        <PlusIcon height={14} width={14} className="cursor-pointer" />
      </span>
    </>
  );
};

export default InputWithControls;
