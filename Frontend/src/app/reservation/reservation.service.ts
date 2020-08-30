import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
let GPD_API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public getSeats() {
    return this.http.get(`${GPD_API_URL}/reservations/reserved-seats`).pipe();
  }

  public reserveSeats(reqBody) {
    return this.http
      .post(`${GPD_API_URL}/reservations/reserve-seats`, reqBody)
      .pipe();
  }
  //   passengerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true
  // },
  // seatNumber: {
  //     type: Number,
  //     required: true
  // }

  public deleteAllReservations() {
    return this.http
      .delete(`${GPD_API_URL}/reservations/delete-all-reservations`)
      .pipe();
  }
}
