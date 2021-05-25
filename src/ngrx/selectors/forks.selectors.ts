import { createSelector, createFeatureSelector } from '@ngrx/store';
import {AppState} from '../../models/app.state';
import {Fork} from '../../models/priority-models';

export const selectForks = createSelector(
  (state: any) => state.reducers.forks.forks,
  (forks: Array<Fork>) => forks
);


export const selectForksCount = createSelector(
  (state: any) => state.reducers.forks.forksCount,
  (forksCount: number) => forksCount
);

export const selectSAveMethodId = createSelector(
  (state: any) => state.reducers.forks.saveMethodId,
  (methodId: number) => methodId
);

