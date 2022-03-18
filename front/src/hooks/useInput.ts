import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type Validator = (value: string) => boolean;

const useInput = <T = any>(initialData: T, validator?: Validator) => {
  const [value, setValue] = useState(initialData);
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);

      if (validator) {
        setIsValid(validator(e.target.value));
      }
    },
    [validator],
  );

  return { value, isValid, onChange, setValue };
};

export default useInput;
