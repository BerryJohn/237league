'use client';

import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { League } from '@shared/types';
import { leagueApi } from '@/api/leagues';
import { addToast } from '@heroui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
interface LeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  league?: League; // If provided, this is edit mode
}

// Game options for the league
const GAME_OPTIONS = [
  { key: 'le-mans-ultimate', label: 'Le Mans Ultimate' },
  { key: 'assetto-corsa-competizione', label: 'Assetto Corsa Competizione' },
  { key: 'iracing', label: 'iRacing' },
];

export function LeagueModal({ isOpen, onClose, league }: LeagueModalProps) {
  const isEditMode = useMemo(() => !!league, [league]);

  const { control, handleSubmit, reset } = useForm<League>({
    defaultValues: {
      name: '',
      description: '',
      game: '',
    },
  });

  // Reset form when modal opens/closes or league changes
  useEffect(() => {
    if (isOpen) {
      reset({
        name: league?.name || '',
        description: league?.description || '',
        game: league?.game || '',
      });
    }
  }, [isOpen, league, reset]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: isEditMode
      ? (data: League) => leagueApi.updateLeague(league!.id, data)
      : (data: League) => leagueApi.createLeague(data),
    onSuccess: () => {
      addToast({
        title: isEditMode
          ? 'Liga została zaktualizowana pomyślnie.'
          : 'Liga została utworzona pomyślnie.',
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      onClose();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      addToast({
        title: isEditMode
          ? 'Nie udało się zaktualizować ligi. Spróbuj ponownie.'
          : 'Nie udało się utworzyć ligi. Spróbuj ponownie.',
        color: 'danger',
      });
    },
  });

  const onFormSubmit = (data: League) => {
    mutate(data);
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      placement="center"
      size="2xl"
      isDismissable={!isPending}
      hideCloseButton={isPending}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">
              {isEditMode ? 'Edytuj ligę' : 'Utwórz nową ligę'}
            </h2>
            <p className="text-sm text-default-500 font-normal">
              {isEditMode
                ? 'Zaktualizuj informacje o lidze poniżej'
                : 'Wypełnij szczegóły, aby utworzyć nową ligę wyścigową'}
            </p>
          </ModalHeader>

          <ModalBody className="gap-4">
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Nazwa ligi jest wymagana',
                minLength: {
                  value: 3,
                  message: 'Nazwa ligi musi mieć co najmniej 3 znaki',
                },
                maxLength: {
                  value: 100,
                  message: 'Nazwa ligi musi mieć mniej niż 100 znaków',
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Nazwa ligi"
                  placeholder="Wprowadź nazwę ligi (np. 'Le Mans Masters 2024')"
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  maxLength={100}
                />
              )}
            />

            <Controller
              name="game"
              control={control}
              rules={{
                required: 'Wybór gry jest wymagany',
              }}
              render={({ field, fieldState }) => (
                <Select
                  label="Gra"
                  placeholder="Wybierz grę dla tej ligi"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    field.onChange(selectedKey || '');
                  }}
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                >
                  {GAME_OPTIONS.map((game) => (
                    <SelectItem key={game.key}>{game.label}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: {
                  value: 1000,
                  message: 'Opis musi mieć mniej niż 1000 znaków',
                },
              }}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="Opis"
                  placeholder="Wprowadź opis ligi (opcjonalnie)"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  maxLength={1000}
                  minRows={3}
                  maxRows={6}
                  description={`Opcjonalnie - opisz format, zasady lub cele ligi (${field.value?.length ?? 0}/1000)`}
                />
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="flat" onPress={handleClose} isDisabled={isPending}>
              Anuluj
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isPending}
              isDisabled={isPending}
            >
              {isPending
                ? isEditMode
                  ? 'Aktualizowanie...'
                  : 'Tworzenie...'
                : isEditMode
                  ? 'Zaktualizuj ligę'
                  : 'Utwórz ligę'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default LeagueModal;
