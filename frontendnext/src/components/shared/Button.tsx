import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event: any) => void;
    type?:  "submit" | "button" | "reset" | undefined;
}

export const Button: React.FC<ButtonProps> = ({
     style, label, onClick, type 
}: ButtonProps) =>{
return(
  <button 
  type={type}
  className={`${style} flex text-white font-semibold transition ease-out duration-500 px-3 py-3 rounded-xl border border-4 border-transparent hover:bg-transparent hover:text-zinc-900 `}
  onClick={onClick}
  >
{label}
  </button>  
);
}