import { Card, CardHeader, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { Alert } from '@heroui/alert';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { countries } from '@/utils/countries';
import Image from 'next/image';

interface PersonalDataCardProps {
  onSave?: (data: PersonalData) => void;
}

interface PersonalData {
  firstName: string;
  lastName: string;
  country: string;
  preferredStartNumber: string;
}

export function PersonalDataCard({ onSave }: PersonalDataCardProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<PersonalData>({
    mode: 'onChange', // Validate on change
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      preferredStartNumber: '',
    },
  });

  // Trigger validation on component mount to show errors immediately
  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = (data: PersonalData) => {
    onSave?.(data);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Dane personalne</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        <Alert variant="faded" className="text-sm" color="secondary">
          Dane personalne są wykorzystywane do identyfikacji zawodników podczas
          zawodów. Bez uzupełnienia tych danych, nie będziesz mógł wziąć w nich
          udziału. Dane nie muszą być prawdziwe, ale powinny być realistyczne.
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Imię"
                    size="sm"
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nazwisko"
                    size="sm"
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="country"
                control={control}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field }) => (
                  <Autocomplete
                    label="Pochodzenie"
                    size="sm"
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                    selectedKey={field.value}
                    onSelectionChange={(key) => field.onChange(key)}
                  >
                    {countries.map((country) => (
                      <AutocompleteItem
                        key={country.code}
                        startContent={
                          <Image
                            alt={country.name}
                            className="w-6 h-6"
                            src={country.image}
                            width={24}
                            height={24}
                          />
                        }
                      >
                        {country.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
              />
            </div>
            <div>
              <Controller
                name="preferredStartNumber"
                control={control}
                rules={{
                  pattern: {
                    value: /^\d+$/,
                    message: 'Numer startowy musi być liczbą',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Preferowany numer startowy"
                    size="sm"
                    isInvalid={!!errors.preferredStartNumber}
                    errorMessage={errors.preferredStartNumber?.message}
                  />
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            size="sm"
            isLoading={isSubmitting}
            fullWidth
          >
            Zapisz zmiany
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
