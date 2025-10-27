import { useCallback, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { PhoneInput, Required } from '@/UiKit';
import { type PersonalInfoFormData, personalInfoDataSchema } from '@/types';
import { useApplicationFromContext } from '@/ApplicationPage/ApplicationFormContext';

const PersonalInfoForm: FC = () => {
  const applicationFormCtx = useApplicationFromContext();
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoDataSchema),
    defaultValues: {
      ...applicationFormCtx.personalInfoForm,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = useCallback(
    (data: PersonalInfoFormData) => {
      applicationFormCtx.updateFormData({ step: 0, data });
    },
    [applicationFormCtx],
  );

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-8 space-y-8">
            {/* Phone */}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    Phone
                    <Required />
                  </FormLabel>
                  <PhoneInput
                    field={field}
                    error={!!form.formState.errors.phone}
                  />
                  <FormMessage className="absolute bottom-[-20px]" />
                </FormItem>
              )}
            />

            {/* firstName */}

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    First Name
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Kaha" {...field} />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-20px]" />
                </FormItem>
              )}
            />

            {/* lastName */}

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    Last Name
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Papadze" {...field} />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-20px]" />
                </FormItem>
              )}
            />

            {/* gender */}

            <div>
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel htmlFor="gender">
                      Gender <Required />
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={errors.gender ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="absolute bottom-[-20px]" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Next</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PersonalInfoForm;
