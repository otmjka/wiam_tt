import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { type ParamsFormData, paramsSchema } from '@/types';
import { useApplicationFromContext } from '@/ApplicationFormContext';
import { ParamsFromTestId } from './enums';
import { Required } from '@/UiKit';

const ParamsForm: FC = () => {
  const applicationFormCtx = useApplicationFromContext();

  const form = useForm<ParamsFormData>({
    resolver: zodResolver(paramsSchema),
    defaultValues: {
      ...applicationFormCtx.paramsForm,
    },
  });

  const { watch } = form;

  const loanAmount = watch('loanAmount');
  const loanTerm = watch('loanTerm');

  const onSubmit = useCallback(
    (data: ParamsFormData) => {
      applicationFormCtx.updateFormData({ step: 2, data });
    },
    [applicationFormCtx],
  );

  const onPrev = useCallback(() => {
    applicationFormCtx.onPrevStep({ currentStep: 2, data: form.getValues() });
  }, [applicationFormCtx, form]);

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle>Application Params</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              name="loanAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-10">
                  <FormLabel htmlFor="">
                    Amount: ${loanAmount}
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                      min={200}
                      max={1000}
                      step={100}
                      data-testid="loan-amount-slider"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* loanTerm */}

            <FormField
              name="loanTerm"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel htmlFor="">
                    Duration: {loanTerm} days
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                      min={10}
                      max={30}
                      step={1}
                      data-testid="loan-term-slider"
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
              data-testid={ParamsFromTestId.submitForm}
              onClick={onPrev}
            >
              Previous
            </Button>
            <Button type="submit" data-testid={ParamsFromTestId.submitForm}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ParamsForm;
