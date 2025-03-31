import { useEffect } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

interface Option {
  label: string;
  /**
   * null 은 placeholder
   */
  value: string | null;
  /**
   * multiple 셀렉트에서 선택된 옵션을 표기할 순서
   */
  order?: number;
}

interface FormControllerProps {
  name: string;
  render: ControllerProps['render'];
  defaultValue?: boolean | string | number | Option | Option[] | string[];
}

function FormController({ name, render, defaultValue }: FormControllerProps) {
  const { control, formState, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue === false) {
      setValue(name, false);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={formState.defaultValues?.[name] || defaultValue || ''}
      render={({ field, fieldState, formState }) =>
        render({ field, fieldState, formState })
      }
    />
  );
}

export default FormController;
