import { IMaskInput } from 'react-imask';
import { FormControl } from '@/components/ui/form';

interface PhoneInputProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    ref: React.Ref<HTMLInputElement>;
  };
  error?: boolean;
  placeholder?: string;
  'data-testid'?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  field,
  error,
  placeholder = '0XXX XXX XXX',
  'data-testid': dataTestId,
}) => {
  return (
    <FormControl>
      <IMaskInput
        data-testid={dataTestId || 'phone-input'}
        mask="0 000 000 000"
        lazy={false}
        unmask={true}
        overwrite={true}
        inputRef={field.ref}
        value={field.value}
        onAccept={(value: string | undefined) => {
          if (!value || value.length === 0 || value === '0') {
            field.onChange('');
          } else if (!value.startsWith('0')) {
            field.onChange('0' + value);
          } else {
            field.onChange(value);
          }
        }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          if (!field.value || field.value === '') {
            field.onChange('0');
            setTimeout(() => {
              e.target.setSelectionRange(1, 1);
            }, 0);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const pos = e.currentTarget.selectionStart;
          if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            pos !== null &&
            pos <= 1
          ) {
            e.preventDefault();
            if (field.value === '0' && e.key === 'Backspace') {
              field.onChange('');
              e.currentTarget.blur();
            }
          }
        }}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          if (
            e.currentTarget.selectionStart === 0 &&
            field.value?.startsWith('0')
          ) {
            setTimeout(() => {
              e.currentTarget.setSelectionRange(1, 1);
            }, 0);
          }
        }}
        placeholder={placeholder}
        className={`flex h-9 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? 'border-destructive' : 'border-input'
        }`}
        type="tel"
      />
    </FormControl>
  );
};
