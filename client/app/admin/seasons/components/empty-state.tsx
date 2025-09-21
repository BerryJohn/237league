import { Button } from '@heroui/button';
import DocumentIcon from './document-icon';

interface EmptyStateProps {
  searchValue: string;
  onAddClick: () => void;
}

export function EmptyState({ searchValue, onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <DocumentIcon className="w-12 h-12 text-default-400 mb-4" />
      {searchValue ? (
        <>
          <h3 className="text-lg font-semibold mb-2">Nie znaleziono sezonów</h3>
          <p className="text-default-500 mb-4">
            Brak sezonów pasujących do wyszukiwania "{searchValue}"
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">Brak sezonów</h3>
          <p className="text-default-500 mb-4">
            Rozpocznij tworzenie swojego pierwszego sezonu
          </p>
        </>
      )}
      <Button color="primary" onPress={onAddClick}>
        Dodaj sezon
      </Button>
    </div>
  );
}
