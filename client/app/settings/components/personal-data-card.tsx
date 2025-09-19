import { Card, CardHeader, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
// import {Alert} from "@heroui/alert";

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
                  <Input
                    {...field}
                    label="Kraj pochodzenia"
                    size="sm"
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                  />
                )}
              />
              {/* <Autocomplete size="sm" value={'Polska'}>. // i got problems with autocomplete, it bugs build
                <AutocompleteItem key="polska">Polska</AutocompleteItem>
                <AutocompleteItem key="niemiecka">Niemiecka</AutocompleteItem>
                <AutocompleteItem key="francuska">Francuska</AutocompleteItem>
              </Autocomplete> */}
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
