'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';
import { Button } from '@heroui/button';
import { Race } from '@shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';
import { racesApi } from '@/api/races';

interface RaceDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  race?: Race;
  onSuccess?: () => void;
}

export function RaceDeleteConfirmationModal({
  isOpen,
  onClose,
  race,
  onSuccess,
}: RaceDeleteConfirmationModalProps) {
  const queryClient = useQueryClient();

  const deleteRaceMutation = useMutation({
    mutationFn: (raceId: string) => racesApi.deleteRace(raceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
      onClose();
      addToast({
        title: 'Wyścig został usunięty pomyślnie',
        color: 'success',
      });
      onSuccess?.(); // Call optional success callback
    },
    onError: (error) => {
      console.error('Error deleting race:', error);
      addToast({
        title: 'Wystąpił błąd podczas usuwania wyścigu',
        color: 'danger',
      });
    },
  });

  const handleConfirm = () => {
    if (race) {
      deleteRaceMutation.mutate(race.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Potwierdź usunięcie
        </ModalHeader>
        <ModalBody>
          <p>
            Czy na pewno chcesz usunąć wyścig <strong>"{race?.name}"</strong>?
          </p>
          <p className="text-small text-danger">
            Ta akcja jest nieodwracalna i spowoduje usunięcie wszystkich
            powiązanych wyników i danych.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            color="danger"
            onPress={handleConfirm}
            isLoading={deleteRaceMutation.isPending}
          >
            Usuń wyścig
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RaceDeleteConfirmationModal;
