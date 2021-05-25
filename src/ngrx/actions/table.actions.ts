import {createAction, props} from '@ngrx/store';
import {Fork} from '../../models/priority-models';
import {TableModel} from '../../models/table-model';

export const setTableConfigs = createAction(
  '[GIT Api] Set TableConfigs',
  props<{ configs: TableModel }>()
);

