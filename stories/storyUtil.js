import * as R from 'ramda';
import WindowedSelect from '../src';
import React from 'react';

export const createOptions = R.map(x => ({ value: x, label: `Option ${x}` }));

export const options1 = createOptions(R.range(1,2));
export const options50 = createOptions(R.range(1, 51));
export const options200 = createOptions(R.range(1, 201));

options200[50] = { value: 51, label: `Option 51: No… It's a thing; it's like a plan, but with more greatness. You know how I sometimes have really brilliant ideas? I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship.` }
export const options1K = createOptions(R.range(1, 1001));
export const options5K = createOptions(R.range(1, 5001));
export const options10K = createOptions(R.range(1, 10001));

options10K[50] = { value: 51, label: `Option 51: No… It's a thing; it's like a plan, but with more greatness. You know how I sometimes have really brilliant ideas? I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship.` }
options10K[99] = { value: 100, label: `Option 100: No… It's a thing; it's like a plan, but with more greatness. You know how I sometimes have really brilliant ideas? I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship.` }
options10K[199] = { value: 200, label: `Option 200: No… It's a thing; it's like a plan, but with more greatness. You know how I sometimes have really brilliant ideas? I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship.` }
options10K[499] = { value: 500, label: `Option 500: No… It's a thing; it's like a plan, but with more greatness. You know how I sometimes have really brilliant ideas? I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship.` }
export const options100K = createOptions(R.range(1, 100001));
export const options1M = createOptions(R.range(1, 1000001));

export const groupedOptions = [
  { label: `Group 1`, options: createOptions(R.range(1, 11)) },
  { label: `Group 2`, options: createOptions(R.range(11, 21)) },
  { label: `Group 3`, options: createOptions(R.range(21, 31)) },
];

export function StoryWrapper (props) {
  return (
    <>
      <div>Windowed:</div>
      <WindowedSelect
        windowThreshold={0}
        {...props}
      />
      <div style={{ marginTop: 320 }}/>
      <div>Not windowed:</div>
      <WindowedSelect {...props} />
    </>
  );
}