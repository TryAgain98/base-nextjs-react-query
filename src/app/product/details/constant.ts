import { ISelect } from "@/types";

export const sizeOptions: ISelect[] = [
  { value: "M", label: "M - 중형" },
  { value: "S", label: "S - 소형" },
  { value: "L", label: "L - 대형" },
];

export const colorOptions: ISelect[] = [
  { value: "Teal", label: "Teal" },
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
];

export const additionalOptions: ISelect[] = [
  { value: "선택안함", label: "선택안함" },
  { value: "Gift", label: "선물포장 (2,000원)" },
];
