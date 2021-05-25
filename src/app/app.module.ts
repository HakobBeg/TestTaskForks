import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {combineReducers, StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {forksReducer} from '../ngrx/reducers/forks.reducer';
import {TeximateModule} from 'ngx-teximate';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {tableReducer} from '../ngrx/reducers/table.reducer';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    StoreModule.forRoot({
      reducers: combineReducers({forks: forksReducer, table: tableReducer}, {
        forks: {
          forks: [],
          forksCount: 0,
          saveMethodId: 1
        },
        table: {
          searchCriteria: '',
          length: 0,
          pageSize: 5,
          page: 1
        }
      })
    }),
    TeximateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
