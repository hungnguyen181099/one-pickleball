type UseControlledParams<T> = {
  controlled?: T;
  uncontrolled: T;
};

export const useControlled = <T>({ controlled, uncontrolled }: UseControlledParams<T>) => {
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;

  return { isControlled, value };
};
