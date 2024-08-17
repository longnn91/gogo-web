import React from 'react';

interface IconProps extends React.HTMLAttributes<SVGElement> {
  color: string;
  width?: number;
  fillOpacity?: number;

  height?: number;
  className?: string;
}

type Props = {
  onClick?: () => void;
  Icon: (props: IconProps) => React.JSX.Element;
  iconProps?: Partial<IconProps>;
  className?: string;
};

const ButtonIconCircle = ({
  Icon,
  onClick,
  iconProps = {},
  className,
}: Props) => {
  return (
    <p
      onClick={onClick}
      className={`hover:cursor-pointer hover:bg-opacity-20 my-0 bg-opacity-35 inline-block bg-main rounded-full w-9 h-9 items-center justify-center ${className}`}
    >
      {Icon && <Icon color="#fff" width={20} height={20} {...iconProps} />}
    </p>
  );
};

export default ButtonIconCircle;
