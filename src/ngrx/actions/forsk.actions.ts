import {createAction, props} from '@ngrx/store';
import {Fork} from '../../models/priority-models';

export const setRetrivedForks = createAction(
  '[GIT Api] Set Forks',
  props<{ forks: Fork[] }>()
);

export const setForksCount = createAction(
  '[GIT Api] Set ForksCount',
  props<{ count: number }>()
);

export const setSaveMethodId = createAction(
  '[GIT Api] Set SaveMethodId',
  props<{ methodId: number }>()
);
