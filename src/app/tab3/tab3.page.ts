import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service'
import { HttpService } from '../http.service';
import { format } from 'date-fns'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  selectedId: number;

  constructor(private timeTable: TimetableService, private http: HttpService) {}

  ngOnInit(){
    this.http.getAllSheets();
    this.http.getAllUsers();

    if (typeof this.http.user.id !== 'undefined') {
      this.selectedId = this.http.user.id;
    }
    else {
      this.selectedId = 1;
    }
  }

  displayDate(input: Date) {
    return format(input, 'P');
  }

  displayTime(input: Date) {
    return format(input, 'pp');
  }

  displayName(input: string) {
    return input.split('@')[0];
  }

  checkUsers() {
    return (typeof this.http.allUsers !== 'undefined')
  }

  checkSheets() {
    return (typeof this.http.allSheets !== 'undefined')
  }

  checkSlot(input: number) {
    return (this.http.allSheets.data[input].userId == this.selectedId)
  }

  setID(input: number) {
    this.selectedId = input;

    console.log(this.selectedId);
  }

  logout() {
    console.log(this.http.allSheets);
    //this.http.logout();
  }
}
