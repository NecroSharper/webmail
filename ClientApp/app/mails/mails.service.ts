import { Injectable } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { Mail } from '../core/models/mail';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MailsService {
    private _listners = new Subject<any>();

    constructor(public dataService: DataService) { }

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public getMails(): Observable<Array<Mail>> {
        return this.dataService.get('api/mail') as Observable<Array<Mail>>;
    }

    public getMailsFromMailbox(mailbox:String): Observable<Array<Mail>> {
        return this.dataService.get('api/mail?address=' + mailbox) as Observable<Array<Mail>>;
    }

    public getMail(mailbox:String, id: number): Observable<Array<Mail>> {
        return this.dataService.get('api/mail?address=' + mailbox + '&messageUID=' + id) as Observable<Array<Mail>>;
    }

    public mailsFromMailbox(mailbox:String) {
       this._listners.next(mailbox);
    }
}
