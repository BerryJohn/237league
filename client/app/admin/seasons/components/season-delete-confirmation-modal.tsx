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
import type { Season } from '@shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';
import { seasonsApi } from '@/api/seasons';

interface SeasonDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  season?: Season;
  onSuccess?: () => void;
}

export function SeasonDeleteConfirmationModal({
  isOpen,
  onClose,
  season,
  onSuccess,
}: SeasonDeleteConfirmationModalProps) {
  const queryClient = useQueryClient();

  const deleteSeasonMutation = useMutation({
    mutationFn: (seasonId: string) => seasonsApi.deleteSeason(seasonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seasons'] });
      onClose();
      addToast({
        title: 'Sezon został usunięty pomyślnie',
        color: 'success',
      });
      onSuccess?.(); // Call optional success callback
    },
    onError: (error) => {
      console.error('Error deleting season:', error);
      addToast({
        title: 'Wystąpił błąd podczas usuwania sezonu',
        color: 'danger',
      });
    },
  });

  const handleConfirm = () => {
    if (season) {
      deleteSeasonMutation.mutate(season.id);
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
            Czy na pewno chcesz usunąć sezon <strong>"{season?.name}"</strong>?
          </p>
          <p className="text-small text-danger">
            Ta akcja jest nieodwracalna i spowoduje usunięcie wszystkich
            powiązanych wyścigów i danych.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            color="danger"
            onPress={handleConfirm}
            isLoading={deleteSeasonMutation.isPending}
          >
            Usuń sezon
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SeasonDeleteConfirmationModal;
