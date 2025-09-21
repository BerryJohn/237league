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
import { League } from '@shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leagueApi } from '@/api/leagues';
import { addToast } from '@heroui/toast';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  league?: League;
  onSuccess?: () => void; // Optional callback for when deletion succeeds
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  league,
  onSuccess,
}: DeleteConfirmationModalProps) {
  const queryClient = useQueryClient();

  const deleteLeagueMutation = useMutation({
    mutationFn: leagueApi.deleteLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      onClose();
      addToast({
        title: 'Liga została usunięta pomyślnie',
        color: 'success',
      });
      onSuccess?.(); // Call optional success callback
    },
    onError: (error) => {
      console.error('Error deleting league:', error);
      addToast({
        title: 'Wystąpił błąd podczas usuwania ligi',
        color: 'danger',
      });
    },
  });

  const handleConfirm = () => {
    if (league) {
      deleteLeagueMutation.mutate(league.id);
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
            Czy na pewno chcesz usunąć ligę <strong>"{league?.name}"</strong>?
          </p>
          <p className="text-small text-danger">
            Ta akcja jest nieodwracalna i spowoduje usunięcie wszystkich
            powiązanych sezonów i danych.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            color="danger"
            onPress={handleConfirm}
            isLoading={deleteLeagueMutation.isPending}
          >
            Usuń
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
