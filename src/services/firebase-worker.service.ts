import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Fork} from '../models/priority-models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseWorkerService {

  constructor(private db: AngularFireDatabase) {
  }


  public setItemToDb(item: Fork): Promise<any> {
    return this.db.database.ref('forks/' + item.fullName).set(item);
  }


}
