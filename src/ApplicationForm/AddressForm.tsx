import { type FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type AddressFormData, addressSchema } from '@/types';
import { AddressFormTestId } from './enums';
import { useApplicationFromContext } from '@/ApplicationFormContext';
import { Required } from '@/UiKit';

const AddressForm: FC = () => {
  const applicationFormCtx = useApplicationFromContext();
  const categories = applicationFormCtx.addressFormState.categories;
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...applicationFormCtx.addressForm,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = useCallback(
    (data: AddressFormData) => {
      applicationFormCtx.updateFormData({ step: 1, data });
    },
    [applicationFormCtx],
  );

  const handlePrev = useCallback(() => {
    applicationFormCtx.onPrevStep({ currentStep: 1, data: form.getValues() });
  }, [applicationFormCtx, form]);

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle>Address and Workplace</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              name="workplace"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel htmlFor="">
                    Workplace
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        data-testid="workplace-select"
                        className={errors.workplace ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select workplace category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            data-testid={`workplace-${category}`}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid={AddressFormTestId.firstName}
                      placeholder="Serbia, Novi Sad, Blagoje Parovic 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              type="button"
              data-testid={AddressFormTestId.prevBtn}
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button type="submit" data-testid={AddressFormTestId.submitForm}>
              Next
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddressForm;
// disabled={!form.formState.isValid}disabled={!form.formState.isValid}
