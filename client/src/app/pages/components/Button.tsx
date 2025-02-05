import React from "react";

import Image from "next/image";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  onClick?: () => void;
};

const Button = ({ type, title, icon, variant, full, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        className={`flexCenter gap-3  ${variant} ${full && "w-full"}`}
        onClick={onClick}
      >
        {icon && <Image src={icon} alt="icon" width={24} height={24} />}
        <label className="bold-16 whitespace-nowrap cursor-pointer">
          {title}
        </label>
      </button>
    </div>
  );
};

export default Button;
