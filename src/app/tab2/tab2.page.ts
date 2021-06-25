import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service';
import { HttpService } from '../http.service';
import { format, formatDuration, compareAsc, parseISO, intervalToDuration } from 'date-fns'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  table: any;
  timeSheet: any;
  startDate: any;
  endDate: any;

  startPickerOptions = {
    buttons: [{
      text: 'Cancel',
      role:'cancel',
      handler: () => console.log('Clicked Save!')
    },{
      text: 'Clear',
      handler: () => {this.startDate = null}
    }, {
      text: 'Done',
      handler: (data) => {     
        let year: number = data.year.value;
        let month: number = data.month.value - 1;
        let day: number = data.day.value;
        let date = new Date(year, month, day);
        this.startDate = date.toISOString();
      }
    }]
  }

  endPickerOptions = {
    buttons: [{
      text: 'Cancel',
      role:'cancel',
      handler: () => console.log('Clicked Save!')
    },{
      text: 'Clear',
      handler: () => {this.endDate = null}
    }, {
      text: 'Done',
      handler: (data) => {
        let year: number = data.year.value;
        let month: number = data.month.value - 1;
        let day: number = data.day.value;
        let date = new Date(year, month, day, 23, 59, 59);
        this.endDate = date.toISOString();
      }
    }]
  }

  constructor(private timeTable: TimetableService, private http: HttpService) { }

  ngOnInit() {
    if(typeof this.http.user == 'undefined') {
      this.http.getUser();
    }
  }

  displayDate(input: string) {
    var date = parseISO(input);
    return format(date, 'P');
  }

  displayTime(input: string) {
    var date = parseISO(input)
    return format(date, 'pp');
  }

  displayDuration(inputStart: string, inputEnd: string) {
    var start = parseISO(inputStart), end = parseISO(inputEnd);
    var duration = intervalToDuration({
      start: start,
      end: end
    });
    return formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] });
  }

  checkSheet() {
    return (typeof this.http.timesheet !== 'undefined')
  }

  checkDate(input: string) {
    var afterStart = true, beforeEnd = true, curDate: Date, result: number;
    var date = parseISO(input);
    
    if (this.startDate) {
      curDate = parseISO(this.startDate);
      result = compareAsc(date, curDate);
      if (result != 1) {
        afterStart = false;
      }
    }

    if (typeof this.endDate == "string") {
      curDate = parseISO(this.endDate);
      result = compareAsc(date, curDate);
      if (result != -1) {
        beforeEnd = false;
      }
    }

    if(!afterStart || !beforeEnd){
      return false;
    }
    else{
      return true;
    }
  }

  rebuildTable() {
    
  }

  logout() {
    this.http.logout();
  }
}