import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
let GPD_API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public getSeats() {
    return this.http.get(`${GPD_API_URL}/reservations/reserved-seats`).pipe();
  }

  public postCall = (path, params, reqBody, onSuccess, onFailure) => {
    if (reqBody) var body = JSON.stringify(reqBody);
    fetch(`${GPD_API_URL}/${path}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.error) return onSuccess(data);
        if (onFailure !== undefined && onFailure !== null)
          return onFailure(data.message);
      })
      .catch((error) => {
        console.error(error);
        if (onFailure !== undefined && onFailure !== null) {
          if (error.message) return onFailure(error.message);
          return onFailure(error);
        }
      });
  };

  public reserveSeats(reqBody, onSuccess, onFailure) {
    this.postCall(
      "reservations/reserve-seats",
      null,
      reqBody,
      onSuccess,
      onFailure
    );
  }

  public deleteAllReservations() {
    return this.http
      .delete(`${GPD_API_URL}/reservations/delete-all-reservations`)
      .pipe();
  }
}
