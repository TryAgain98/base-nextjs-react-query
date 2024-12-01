import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 flex items-center justify-center border border-border rounded-sm ${
          checked ? "bg-black text-white" : "bg-white"
        }`}
      >
        {checked && <CheckIcon className="w-4 h-4 text-white" />}
      </div>
      <span className="text-black font-medium">{label}</span>
    </label>
  );
};

export default CheckBox;
