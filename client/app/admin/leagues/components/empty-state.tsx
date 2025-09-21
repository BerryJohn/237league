import React from 'react';
import { Button } from '@heroui/button';
import { DocumentIcon } from './document-icon';

interface EmptyStateProps {
  searchValue?: string;
  onAddClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchValue,
  onAddClick,
}) => {
  const isSearchEmpty = !!searchValue;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">
        <DocumentIcon />
      </div>
      <h3 className="text-lg font-semibold text-default-600 mb-2">
        {isSearchEmpty ? 'Brak wyników wyszukiwania' : 'Brak lig'}
      </h3>
      <p className="text-sm text-default-400 mb-6">
        {isSearchEmpty
          ? `Nie znaleziono lig pasujących do "${searchValue}"`
          : 'Nie utworzono jeszcze żadnej ligi. Rozpocznij od dodania pierwszej ligi.'}
      </p>
      {!isSearchEmpty && (
        <Button color="primary" onPress={onAddClick}>
          Dodaj pierwszą ligę
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
