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
import { Textarea } from '@heroui/input';
import { Race, Season } from '@shared/types';
import { seasonsApi } from '@/api/seasons';
import { addToast } from '@heroui/toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { racesApi } from '@/api/races';

interface RaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  race?: Race; // If provided, this is edit mode
}

// Form data type for the race modal
interface RaceFormData {
  name: string;
  trackName: string;
  description: string;
  raceDate: string;
  seasonId: string;
  game: string;
}

export function RaceModal({ isOpen, onClose, race }: RaceModalProps) {
  const isEditMode = useMemo(() => !!race, [race]);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RaceFormData>({
    defaultValues: {
      name: race?.name || '',
      trackName: race?.trackName || '',
      description: race?.description || '',
      raceDate: race?.raceDate
        ? new Date(race.raceDate).toISOString().slice(0, 16)
        : '',
      seasonId: race?.seasonId || '',
      game: race?.game || '',
    },
  });

  // Fetch seasons for the dropdown
  const { data: seasonsResponse } = useQuery({
    queryKey: ['seasons'],
    queryFn: seasonsApi.getAllSeasons,
  });

  const seasons = seasonsResponse?.data || [];

  // Game options
  const gameOptions = [
    { key: 'lemans-ultimate', label: 'Le Mans Ultimate' },
    { key: 'f1-24', label: 'F1 24' },
    { key: 'assetto-corsa', label: 'Assetto Corsa' },
    { key: 'iracing', label: 'iRacing' },
  ];

  const createRaceMutation = useMutation({
    mutationFn: (data: RaceFormData) => {
      const raceData = {
        ...data,
        raceDate: new Date(data.raceDate).toISOString(),
        seasonId: data.seasonId || null,
        game: data.game || null,
      };
      return racesApi.createRace(raceData as Race);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
      onClose();
      addToast({
        title: 'Wyścig został utworzony pomyślnie',
        color: 'success',
      });
    },
    onError: (error) => {
      console.error('Error creating race:', error);
      addToast({
        title: 'Wystąpił błąd podczas tworzenia wyścigu',
        color: 'danger',
      });
    },
  });

  const updateRaceMutation = useMutation({
    mutationFn: (data: RaceFormData) => {
      if (!race) throw new Error('Race not found');
      const raceData = {
        ...data,
        raceDate: new Date(data.raceDate).toISOString(),
        seasonId: data.seasonId || null,
        game: data.game || null,
      };
      return racesApi.updateRace(race.id, raceData as Race);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
      onClose();
      addToast({
        title: 'Wyścig został zaktualizowany pomyślnie',
        color: 'success',
      });
    },
    onError: (error) => {
      console.error('Error updating race:', error);
      addToast({
        title: 'Wystąpił błąd podczas aktualizacji wyścigu',
        color: 'danger',
      });
    },
  });

  const onSubmit = (data: RaceFormData) => {
    if (isEditMode) {
      updateRaceMutation.mutate(data);
    } else {
      createRaceMutation.mutate(data);
    }
  };

  const isLoading =
    createRaceMutation.isPending || updateRaceMutation.isPending;

  useEffect(() => {
    if (isOpen) {
      reset({
        name: race?.name || '',
        trackName: race?.trackName || '',
        description: race?.description || '',
        raceDate: race?.raceDate
          ? new Date(race.raceDate).toISOString().slice(0, 16)
          : '',
        seasonId: race?.seasonId || '',
        game: race?.game || '',
      });
    }
  }, [isOpen, race, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            {isEditMode ? 'Edytuj wyścig' : 'Nowy wyścig'}
          </ModalHeader>
          <ModalBody className="gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Nazwa wyścigu jest wymagana' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nazwa wyścigu"
                    placeholder="Wprowadź nazwę wyścigu"
                    isRequired
                    errorMessage={errors.name?.message}
                    isInvalid={!!errors.name}
                  />
                )}
              />

              <Controller
                name="trackName"
                control={control}
                rules={{ required: 'Nazwa toru jest wymagana' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Tor"
                    placeholder="Wprowadź nazwę toru"
                    isRequired
                    errorMessage={errors.trackName?.message}
                    isInvalid={!!errors.trackName}
                  />
                )}
              />
            </div>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Opis"
                  placeholder="Wprowadź opis wyścigu (opcjonalnie)"
                  minRows={3}
                />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="raceDate"
                control={control}
                rules={{ required: 'Data wyścigu jest wymagana' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="datetime-local"
                    label="Data i godzina wyścigu"
                    isRequired
                    errorMessage={errors.raceDate?.message}
                    isInvalid={!!errors.raceDate}
                  />
                )}
              />

              <Controller
                name="game"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gra"
                    placeholder="Wybierz grę"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];
                      field.onChange(selectedKey || '');
                    }}
                  >
                    {gameOptions.map((game) => (
                      <SelectItem key={game.key}>{game.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <Controller
              name="seasonId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Sezon"
                  placeholder="Wybierz sezon (opcjonalnie)"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    field.onChange(selectedKey || '');
                  }}
                >
                  {seasons.map((season) => (
                    <SelectItem key={season.id}>{season.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Anuluj
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              {isEditMode ? 'Aktualizuj' : 'Utwórz'} wyścig
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default RaceModal;
