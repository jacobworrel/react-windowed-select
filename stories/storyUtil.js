import * as R from 'ramda';

export const createOptions = R.map(x => ({ value: x, label: `Option ${x}` }));