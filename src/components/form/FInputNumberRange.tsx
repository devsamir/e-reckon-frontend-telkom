import React from 'react';
import { useFormContext } from 'react-hook-form';
import FInputNumber from './FInputNumber';

interface Props {
  name: string;
}

const FInputNumberRange: React.FC<Props> = ({ name }) => {
  const { watch } = useFormContext();
  const values = watch(name);
  return (
    <div className="flex gap-1 items-center">
      <FInputNumber name={`${name}.min`} placeholder="Min" />
      <span>~</span>
      <FInputNumber
        name={`${name}.max`}
        min={values?.min || undefined}
        placeholder="Max"
      />
    </div>
  );
};

export default FInputNumberRange;
