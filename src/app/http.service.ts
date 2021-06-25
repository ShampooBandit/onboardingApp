import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TimetableService } from './timetable.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  ip = "34.219.113.221";

  user: any;
  timesheet: any;
  allUsers: any;
  allSheets: any;

  constructor(private http: HttpClient, private timetable: TimetableService) { }

  login(username: string, password: string) {
    this.http.post("https://" + this.ip + "/auth/login", {
      "email": username,
      "password": password
    }, {withCredentials: true}).subscribe((res) => {
      console.log(res);
      this.getUser();
    })
  }

  logout() {
    this.http.post("https://" + this.ip + "/auth/logout", {
    }, {withCredentials: true}).subscribe((res) => {
      console.log(res)
    })
  }

  getUser() {
    this.http.get("https://" + this.ip + "/users/me", 
    {withCredentials: true}).subscribe((res) => {
      this.user = res;
      this.getTimesheet();
    })
  }

  getTimesheet() {
    this.http.get("https://" + this.ip + "/times/user/" + this.user.data.id, {
      withCredentials: true
    }).subscribe((res) => {
      this.timesheet = res;
      this.timetable.timeSheet = res;
    })
  }

  addTime(input: timeSlot) {
    this.http.post("https://" + this.ip + "/times", {
      "startTime": input.startTime,
      "endTime": input.endTime,
      "project": input.project,
      "note": input.note,
      "userId": this.user.data.id
    }, {withCredentials: true}).subscribe((res) => {
      console.log(res)
    })
  }

  clockIn(input) {
    this.http.post("https://" + this.ip + "/times", {
      "startTime": input.startTime,
      "project": input.project,
      "note": input.note,
      "userId": this.user.data.id
    }, {withCredentials: true}).subscribe((res) => {
      console.log(res)
    })
  }

  clockOut(input) {
    this.http.put("https://" + this.ip + "/times", {
      "endTime": input.startTime,
      "project": input.project,
      "note": input.note
    }, {withCredentials: true}).subscribe((res) => {
      console.log(res)
    })
  }

  getAllSheets() {
    this.http.get("https://" + this.ip + "/times", {
      withCredentials: true
    }).subscribe((res) => {
      this.allSheets = res;
      console.log(res);
    })
  }

  getAllUsers() {
    this.http.get("https://" + this.ip + "/users", {
      withCredentials: true
    }).subscribe((res) => {
      this.allUsers = res;
      console.log(res);
    })
  }
}

interface timeSlot {
  startTime: Date;
  endTime: Date;
  totalTime: Duration;
  project: string;
  note: string;
}

interface userData {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}