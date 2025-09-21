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
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { Alert } from '@heroui/alert';
import type { Season, League } from '@shared/types';
import { leagueApi } from '@/api/leagues';
import { addToast } from '@heroui/toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { seasonsApi } from '@/api/seasons';

interface SeasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  season?: Season; // If provided, this is edit mode
}

// Season status options
const SEASON_STATUS_OPTIONS = [
  { key: 'upcoming', label: 'Nadchodzący' },
  { key: 'ongoing', label: 'Trwający' },
  { key: 'finished', label: 'Zakończony' },
  { key: 'cancelled', label: 'Anulowany' },
] as const;

type SeasonStatus = 'upcoming' | 'ongoing' | 'finished' | 'cancelled';

// Form data type for the season modal
interface SeasonFormData {
  name: string;
  leagueId: string;
  status: SeasonStatus;
}

export function SeasonModal({ isOpen, onClose, season }: SeasonModalProps) {
  const isEditMode = useMemo(() => !!season, [season]);

  const { control, handleSubmit, reset } = useForm<SeasonFormData>({
    defaultValues: {
      name: season?.name || '',
      leagueId: season?.leagueId || '',
      status: season?.status || 'upcoming',
    },
  });

  // Fetch leagues for the dropdown
  const { data: leagues } = useQuery({
    queryKey: ['leagues'],
    queryFn: leagueApi.getAllLeagues,
  });

  // Reset form when modal opens/closes or season changes
  useEffect(() => {
    if (isOpen) {
      // Convert isFinished boolean to status
      let status: SeasonStatus = 'upcoming';
      if (season?.isFinished) {
        status = 'finished';
      }

      reset({
        name: season?.name || '',
        leagueId: season?.leagueId || '',
        status: status || 'upcoming',
      });
    }
  }, [isOpen, season, reset]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: isEditMode
      ? (data: Partial<Season>) => seasonsApi.updateSeason(season!.id, data)
      : (data: Partial<Season>) => seasonsApi.createSeason(data),
    onSuccess: () => {
      addToast({
        title: isEditMode
          ? 'Sezon został zaktualizowany pomyślnie.'
          : 'Sezon został utworzony pomyślnie.',
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['seasons'] });
      onClose();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      addToast({
        title: isEditMode
          ? 'Nie udało się zaktualizować sezonu. Spróbuj ponownie.'
          : 'Nie udało się utworzyć sezonu. Spróbuj ponownie.',
        color: 'danger',
      });
    },
  });

  const onFormSubmit = (data: Partial<Season>) => {
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
              {isEditMode ? 'Edytuj sezon' : 'Utwórz nowy sezon'}
            </h2>
            <p className="text-sm text-default-500 font-normal">
              {isEditMode
                ? 'Zaktualizuj informacje o sezonie poniżej'
                : 'Wypełnij szczegóły, aby utworzyć nowy sezon wyścigowy'}
            </p>
          </ModalHeader>

          <ModalBody className="gap-4">
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Nazwa sezonu jest wymagana',
                minLength: {
                  value: 3,
                  message: 'Nazwa sezonu musi mieć co najmniej 3 znaki',
                },
                maxLength: {
                  value: 100,
                  message: 'Nazwa sezonu musi mieć mniej niż 100 znaków',
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Nazwa sezonu"
                  placeholder="Wprowadź nazwę sezonu (np. 'Sezon 2024')"
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  maxLength={100}
                />
              )}
            />

            <Controller
              name="leagueId"
              control={control}
              rules={{
                required: 'Wybór ligi jest wymagany',
              }}
              render={({ field, fieldState }) => (
                <Select
                  label="Liga"
                  placeholder="Wybierz ligę dla tego sezonu"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    field.onChange(selectedKey || '');
                  }}
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  isLoading={!leagues}
                >
                  {leagues?.data?.map((league: League) => (
                    <SelectItem key={league.id}>{league.name}</SelectItem>
                  )) || []}
                </Select>
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{
                required: 'Status sezonu jest wymagany',
              }}
              render={({ field, fieldState }) => (
                <Select
                  label="Status sezonu"
                  placeholder="Wybierz status sezonu"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    field.onChange(selectedKey || '');
                  }}
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  description={
                    field.value === 'upcoming'
                      ? 'Sezon jest planowany i jeszcze się nie rozpoczął'
                      : field.value === 'ongoing'
                        ? 'Sezon jest obecnie w toku'
                        : field.value === 'finished'
                          ? 'Sezon został oficjalnie zakończony'
                          : 'Sezon jest obecnie aktywny i trwają wyścigi'
                  }
                >
                  {SEASON_STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.key}>{status.label}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Alert
              color="primary"
              variant="flat"
              title="Automatyczne określanie dat sezonu"
              description={
                <div className="space-y-2">
                  <p>
                    Data rozpoczęcia sezonu będzie automatycznie ustawiona na
                    datę pierwszego wyścigu, a data zakończenia na datę
                    ostatniego wyścigu w sezonie.
                  </p>
                  {season?.races && season.races.length > 0 && (
                    <div className="text-xs mt-2 pt-2 border-t border-primary-200">
                      <p className="font-medium">
                        📅 Wyścigi: {season.races.length} zaplanowanych
                      </p>
                      {season.startDate && (
                        <p>
                          📍 Obecne daty:{' '}
                          {new Date(season.startDate).toLocaleDateString()} -{' '}
                          {season.endDate
                            ? new Date(season.endDate).toLocaleDateString()
                            : 'Nie określona'}
                        </p>
                      )}
                    </div>
                  )}
                  {(!season?.races || season.races.length === 0) && (
                    <p className="text-xs text-default-500 italic">
                      Dodaj wyścigi do sezonu, aby automatycznie określić daty.
                    </p>
                  )}
                </div>
              }
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
                  ? 'Zaktualizuj sezon'
                  : 'Utwórz sezon'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default SeasonModal;
