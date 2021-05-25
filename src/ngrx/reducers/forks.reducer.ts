import {Fork, ForksState} from '../../models/priority-models';
import {createReducer, on} from '@ngrx/store';
import {setForksCount, setRetrivedForks, setSaveMethodId} from '../actions/forsk.actions';

export const initialState: ForksState = {
  forks: [],
  forksCount: 0,
  saveMethodId: 1
};

export const forksReducer = createReducer(
  initialState,
  on(setRetrivedForks, (state, {forks}) => {
    return {forks, forksCount: state.forksCount, saveMethodId: state.saveMethodId};
  }),
  on(setForksCount, (state, {count}) => {
    return {forks: state.forks, forksCount: count, saveMethodId: state.saveMethodId};
  }),
  on(setSaveMethodId, (state, {methodId}) => {
    return {forks: state.forks, forksCount: state.forksCount, saveMethodId: methodId};
  }),
);
