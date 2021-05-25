import {createReducer, on} from '@ngrx/store';
import {TableModel} from '../../models/table-model';
import {setTableConfigs} from '../actions/table.actions';

export const initialState: TableModel = {
  page: 1,
  pageSize: 5,
  length: 0,
  searchCriteria: ''
};

export const tableReducer = createReducer(
  initialState,
  on(setTableConfigs, (state, {configs}) => configs),
);
