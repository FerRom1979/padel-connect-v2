export interface AutocompleteOption {
  id: number;
  label: string;
}

export interface AutocompleteProps {
  inputValue: string;
  options: AutocompleteOption[];
  placeholder?: string;
  isLoading?: boolean;

  onInputChange: (value: string) => void;
  onChange: (option: AutocompleteOption) => void;
  onClear?: () => void;
}
