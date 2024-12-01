import React from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid";

export type CheckBoxAllType = "all" | "some" | "none";
interface CheckBoxProps {
  checked: CheckBoxAllType;
  onChange: (checked: CheckBoxAllType) => void;
  label: string;
}

const CheckBoxAll: React.FC<CheckBoxProps> = ({ checked, onChange, label }) => {
  const handleChange = (checked: CheckBoxAllType) => {
    if (checked === "all") {
      return onChange("none");
    }
    onChange("all");
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => handleChange(checked)}
        className={`w-5 h-5 flex items-center justify-center border border-border rounded-sm ${
          checked !== "none" ? "bg-black text-white" : "bg-white"
        }`}
      >
        {checked === "all" && <CheckIcon className="w-4 h-4 text-white" />}
        {checked === "some" && <MinusIcon className="w-4 h-4 text-white" />}
      </div>
      <span className="text-black font-medium">{label}</span>
    </label>
  );
};

export default CheckBoxAll;
