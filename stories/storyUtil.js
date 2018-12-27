import * as R from 'ramda';

export const createOptions = R.map(x => ({ value: x, label: `Option ${x}` }));

export const options1 = createOptions(R.range(1,2));
export const options50 = createOptions(R.range(1, 51));
export const options200 = createOptions(R.range(1, 201));
export const options1000 = createOptions(R.range(1, 1001));
export const options5000 = createOptions(R.range(1, 5001));
export const options10000 = createOptions(R.range(1, 10001));

export const groupedOptions = [
  { label: `Group 1`, options: createOptions(R.range(1, 11)) },
  { label: `Group 2`, options: createOptions(R.range(11, 21)) },
  { label: `Group 3`, options: createOptions(R.range(21, 31)) },
];