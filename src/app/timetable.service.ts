import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private _timeSheet: timeSlot[];

  constructor() { }

  get timeSheet(): timeSlot[] {
    return this._timeSheet;
  }

  set timeSheet(sheet: timeSlot[]) {
    this._timeSheet = sheet;
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
  date: Date;
  startTime: Date;
  endTime: Date;
  totalTime: Duration;
  project: string;
}