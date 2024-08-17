"use client";

import { capitalizeFirstLetter } from "@/utils/system.util";
import {
  Box,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import { InputHTMLAttributes, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Variant = "filled" | "outlined";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
  error?: string;
  className?: string;
  label?: string;
  IconLabel?: React.ReactElement;
  formRef?: UseFormRegister<FieldValues>;
  loading?: boolean;
  variant?: Variant;
  suffix?: string;
  customInput?: string;
  isFormat?: boolean;
  isNotNegative?: boolean;
  smallLabel?: boolean;
  positive?: boolean;
  negative?: boolean;
}

export const InputField: React.FC<Props> = ({
  label,
  error,
  type = "text",
  formRef,
  loading,
  className,
  customInput,
  variant = "filled",
  required,
  suffix,
  isFormat = false,
  isNotNegative = false,
  smallLabel = false,
  IconLabel,
  ...props
}: Props) => {
  const [eye, setEye] = useState(false);
  const option = formRef ? { ...formRef(props.name || "") } : {};
  const classLabel = smallLabel ? "text-[12px]" : "";
  return (
    <Box className={`${className}`} sx={{ width: "100%" }}>
      <div
        className={`flex items-center justify-between ${
          !label && "!justify-end mb-[-1.8rem]"
        }`}
      >
        {label && (
          <>
            <Label className={`flex gap-1 ${classLabel} `}>
              {label}
              {required && <span className="font-bold text-[#F45647]"> *</span>}
              <span style={{ translate: "translateY(-3px)" }}>{IconLabel}</span>
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
        <Box className="relative">
          <Input
            className={`custom-input-field ${customInput} ${
              isFormat && "hidden"
            } ${error && "error"} ${suffix && "pr-14"}`}
            autoComplete="off"
            variant={variant}
            min={0}
            {...option}
            {...props}
            type={eye ? "text" : type}
          />

          {isFormat && props?.readOnly && (
            <Input
              className={`custom-input-field ${error && "error"} ${
                suffix && "pr-14"
              }`}
              variant={variant}
              autoComplete="off"
              readOnly={props.readOnly}
              value={props.value as number}
            />
          )}

          {suffix && (
            <span
              className={
                "absolute right-4 top-3.5 transform -translate-y-1/2 text-[1.8rem]"
              }
            >
              {suffix}
            </span>
          )}
          {type === "password" && (
            <EyeIcon
              className={`${eye && "active"}`}
              onClick={() => setEye(!eye)}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export const SkeletonInputField = (props: { variant?: Variant }) => (
  <div className="animate-pulse">
    <div
      className={`${
        props.variant === "outlined" ? "h-[4.4rem]" : "h-[3rem]"
      } bg-gray-500 rounded skeleton`}
    ></div>
  </div>
);

export const Label = styled("label")`
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.tColor[400]};
  white-space: nowrap;
`;

export const HelpIcon = styled("img")`
  width: 18px;
  height: auto;
`;

const TooltipWrapper = styled(Tooltip)``;

export const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <TooltipWrapper {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "#eb5946e1",
    boxShadow: "0 0 3rem 0rem rgba(0, 0, 0, 0.08)",
    color: "#fff",
    fontSize: "1.4rem",
    fontWeight: 400,
    borderRadius: "0.4rem",
    overFlow: "hidden",
    maxWidth: "20rem",
  },
}));

const EyeIcon = styled("div")`
  content: "";
  position: absolute;
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  top: 0.5rem;
  right: 0.5rem;
  background-image: url("/icons/eye-icon.svg");
  background-size: cover;
  background-position: center;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s;

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    background-image: url("/icons/eye-off-icon.svg");
  }
`;

export const Input = styled<any>("input")`
  position: relative;
  ${(props) =>
    props.variant === "outlined"
      ? `border: 1px solid; padding: 1.1rem 1.4rem; border-radius: 0.8rem;`
      : "border: none; border-bottom: 1px solid; padding: 3px 0; padding-right: 3rem;"}
  border-color:  ${(props) => props.theme.palette.tColor[200]};
  outline: none;
  font-size: 1.8rem;
  font-weight: ${(props) => (props.variant === "outlined" ? 400 : 700)};
  width: 100%;

  background-color: ${(props) =>
    props.variant === "filled"
      ? "transparent !important"
      : "rgba(255, 255, 255, 0.10)"};

  color: ${(props) => props.theme.palette.tColor[0]};

  outline: none;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    background-color: ${(props) =>
      props.variant === "filled"
        ? "transparent !important"
        : "rgba(255, 255, 255, 0.10)"};
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: ${(props) =>
      props.theme.palette.tColor[0]} !important;
  }

  transition: all 0.6s;

  &.error {
    border-color: "#eb5a46";
  }

  &::placeholder {
    color: ${(props) => props.theme.palette.tColor[300]};
  }
  &:hover {
    border-color: ${(props) => props.theme.palette.tColor[400]};
  }
  &:focus {
    border-color: ${(props) => props.theme.palette.tColor[400]};
  }
  &.error {
    border-color: ${(props) => props.theme.palette.error.main};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.palette.tColor[700]} !important;
    border-color: ${(props) => props.theme.palette.tColor[300]} !important;
  }

  &:read-only {
    color: ${(props) =>
      props.positive
        ? "rgba(87, 203, 37, 1)"
        : props.negative
        ? "rgba(244, 86, 71, 1)"
        : props.theme.palette.pColor[0]};

    background: ${(props) =>
      props.positive
        ? "rgba(87, 203, 37, 0.16)"
        : props.negative
        ? "rgba(244, 86, 71, 0.16)"
        : "rgba(204, 155, 18, 0.16)"};

    border-color: ${(props) =>
      props.positive
        ? "rgba(87, 203, 37, 0.3)"
        : props.negative
        ? "rgba(244, 86, 71, 0.3)"
        : "rgba(204, 155, 18, 0.3)"};
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
