import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private _timeSheet: any;

  constructor() { }

  get timeSheet(): any {
    return this._timeSheet;
  }

  set timeSheet(sheet: any) {
    this._timeSheet = sheet;
  }

  loadSheet() {
    
  }

  addTime(slot: timeSlot) {
    this._timeSheet.push(slot);
  }

  removeTime() {
    this._timeSheet.pop();
  }

  removeTimeIndex(i: number) {
    this._timeSheet.splice(i, 1);
  }
}

interface timeSlot {
  startTime: Date;
  endTime: Date;
  project: string;
  note: string;
  userId: number;
}