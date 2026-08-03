'use client';

import type { SelectHTMLAttributes } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formControlClassName } from '../form-control';

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({
  options,
  placeholder,
  className,
  value,
  onChange,
  disabled,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(
          formControlClassName,
          'flex items-center justify-between',
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />

        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="
            z-50
            w-(--radix-select-trigger-width)
            overflow-hidden
            rounded-md
            border
            border-gray-300
            shadow-lg
            bg-white
            mt-2
          "
        >
          <SelectPrimitive.Viewport className="p-1 ">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="
                  relative
                  flex
                  h-10
                  cursor-pointer
                  select-none
                  items-center
                  rounded-sm
                  px-3
                  pl-9
                  text-sm
                  outline-none
                  hover:bg-accent
                  focus:bg-accent
                  data-disabled:pointer-events-none
                  data-disabled:opacity-50
              
                "
              >
                <span
                  className="
                    absolute
                    left-3
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                  "
                >
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>

                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
