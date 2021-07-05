import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Step = undefined | 'init' | 'connection';

interface ISetStepPayload {
  step: Step;
}

export interface IPolkadotState {
  step: Step;
}

const initialState: IPolkadotState = {
  step: undefined,
};

export const polkadotSlice = createSlice({
  name: 'polkadot',
  initialState: initialState,
  reducers: {
    setStep: (state, action: PayloadAction<ISetStepPayload>) => {
      state.step = action.payload?.step;
    },
  },
});
