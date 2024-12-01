import React, { useState, useEffect, useRef } from "react";
import { useController, Control } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ISelect } from "@/types";

interface ReusableSelectProps {
  name: string;
  label: string;
  options: ISelect[];
  control: Control<any>;
  required?: boolean;
}

const Select: React.FC<ReusableSelectProps> = ({ name, label, options, control, required }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? "Required" : false },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(field.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: ISelect) => {
    if (Boolean(option.isDisable)) return;
    setSelectedValue(option.label);
    field.onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-sm font-medium  mb-2">
        {label}
        {required && <span className="text-[red] ml-1">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className={`block w-full px-4 py-2 pr-10 cursor-pointer border ${
            error ? "border-red-600" : "border-gray-300"
          } rounded-md shadow-sm bg-background`}
        >
          <span className="text-gray-700">{selectedValue || "선택"}</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => selectOption(option)}
                className={`px-4 py-2 cursor-pointer text-gray-700 ${
                  option.isDisable ? "text-gray-400 cursor-not-allowed" : "hover:bg-black hover:text-white"
                }`}
                style={{ backgroundColor: option.isDisable ? "#f7fafc" : "" }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Select;
