import { Injectable } from '@angular/core';
import { NotifierService as Notifier } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private readonly notifier: Notifier;

  constructor( private notifierService: Notifier) {
    this.notifier = notifierService;
  }
 /**
  * Show a notification
  * @param {string} type -
  * @param {string} message -
  * @memberof NotifierService -
  */
 public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}
