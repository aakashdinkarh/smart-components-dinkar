import { isEmpty } from "@utils/isEmpty";

import type { helperFunctionsProps, IsetNewFocus, Option } from "./interfaces";

export function isContain(val1: string, val2: string): boolean {
  return val1.toLowerCase().includes(val2.toLowerCase());
}

export function getDefaultValue({
  value = "",
  options = [],
  multiple = false,
}: Partial<helperFunctionsProps>): string | string[] {
  if (multiple) {
    if (Array.isArray(value)) {
      return options
        .filter((option) => value.includes(option.value))
        .map((option) => option.value);
    }
    if (typeof value === "string") {
      return options
        .filter((option) => value != null && option.value === value)
        .map((option) => option.value);
    }
  }
  return (
    options.find((option) => value != null && option.value === value)?.value ??
    ""
  );
}

export function getDisplayValue({
  selectedValue = "",
  options = [],
  multiple = false,
}: Partial<helperFunctionsProps>): string | undefined {
  if (multiple && Array.isArray(selectedValue)) {
    let displayValue: string | undefined = options.find(
      (option) => option.value === selectedValue[0]
    )?.label;

    displayValue =
      displayValue != null
        ? `${displayValue} (${selectedValue.length})`
        : undefined;

    return displayValue;
  }

  return options.find((option) => option.value === selectedValue)?.label;
}

export function getVisibleOptions({
  selectedValue = "",
  options = [],
  multiple = false,
}: Partial<helperFunctionsProps>): Option[] {
  if (isEmpty(selectedValue)) {
    return options;
  }

  if (multiple) {
    return options.filter((option) => !selectedValue.includes(option.value));
  }

  return options.filter((option) => option.value !== selectedValue);
}

export function setNewFocus({ n = 0, func, max, min = 0 }: IsetNewFocus): void {
  if (n > 0) {
    func((prev: number) => (prev >= max ? min : prev + n));
  } else if (n < 0) {
    func((prev: number) => (prev <= min ? max : prev + n));
  }
}
