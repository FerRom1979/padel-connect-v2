'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';

import { Input } from '@/components/ui';

import type { AutocompleteProps } from './autocomplete.types';

export function Autocomplete({
  id,
  inputValue,
  options,
  placeholder,
  isLoading,
  onInputChange,
  onChange,
  onClear,
  disabled,
  minChars = 2,
  error,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);

  const canSearch = inputValue.trim().length >= minChars;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div className="relative">
          <Input
            id={id}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => {
              if (canSearch) {
                setOpen(true);
              }
            }}
            onChange={(event) => {
              const value = event.target.value;

              onInputChange(value);

              if (canSearch) {
                setOpen(true);
              } else {
                setOpen(false);
              }
            }}
          />

          {error && <p className="mt-1 text-sm text-danger">{error}</p>}

          {inputValue && onClear && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-muted
                hover:text-foreground
              "
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </Popover.Anchor>

      <Popover.Content
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="
          z-50
          mt-2
          w-(--radix-popover-trigger-width)
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-surface
          shadow-lg
        "
      >
        {canSearch && (
          <Command shouldFilter={false} loop={false}>
            {isLoading && (
              <div className="px-4 py-3 text-sm text-muted">Buscando...</div>
            )}

            {!isLoading && options.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted">
                No se encontraron resultados
              </div>
            )}

            {!isLoading &&
              options.map((option) => (
                <Command.Item
                  key={option.id}
                  value={String(option.id)}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className="
                    cursor-pointer
                    px-4
                    py-3
                    text-sm
                    hover:bg-surface-muted
                  "
                >
                  {option.label}
                </Command.Item>
              ))}
          </Command>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
