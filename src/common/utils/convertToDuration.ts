import { differenceInMilliseconds } from 'date-fns';

export const convertToDuration = (start: Date, finish: Date) => {
  return new Date(differenceInMilliseconds(finish, start))
    .toISOString()
    .substr(11, 8);
};
