import { FormControl, InputLabel, Select } from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { PropsWithChildren } from 'react';

interface PropsDropdown extends PropsWithChildren {
  caption?: string;
  onChange: SelectInputProps['onChange'];
  value: string;
}

export function PropsDropdown({
  caption,
  value,
  onChange,
  children,
}: PropsDropdown) {
  return (
    <FormControl>
      <InputLabel>{caption}</InputLabel>
      <Select native value={value} onChange={onChange}>
        {children}
      </Select>
    </FormControl>
  );
}
