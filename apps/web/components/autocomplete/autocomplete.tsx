'use client';

import { useEffect, useRef, useState } from 'react';
import type { AutocompleteProps } from './autocomplete.types';

export function Autocomplete({
  inputValue,
  options,
  placeholder,
  isLoading,
  onInputChange,
  onChange,
  onClear,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <input
        value={inputValue}
        placeholder={placeholder}
        onChange={(event) => {
          onInputChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {inputValue && onClear && (
        <button
          type="button"
          onClick={() => {
            onClear();
          }}
        >
          ✕
        </button>
      )}

      {isLoading && <div>Buscando...</div>}

      {isOpen && inputValue.length >= 2 && (
        <ul>
          {options.length > 0 ? (
            options.map((option) => (
              <button type="button" onClick={() => onChange(option)}>
                {option.label}
              </button>
            ))
          ) : (
            <li>No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
}
