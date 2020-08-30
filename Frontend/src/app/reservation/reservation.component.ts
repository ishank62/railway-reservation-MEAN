import { Component, OnInit } from "@angular/core";
import { ReservationService } from "./reservation.service";
import { ObjectID } from "bson";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.scss"],
})
export class ReservationComponent implements OnInit {
  passengerId = new ObjectID().toString();
  numberOfSeats;
  seats = [];
  filledSeats = [];
  selectedSeats = [];
  success = false;
  validation = true;
  errMess;

  constructor(private rs: ReservationService) {}

  ngOnInit(): void {
    this.rs.getSeats().subscribe((res) => {
      this.filledSeats = res["response"]["filledSeats"];
    });
    for (let i = 1; i <= 80; i++) {
      this.seats.push(i);
    }
  }

  handleChange(event) {
    this.numberOfSeats = parseInt(event.target.value);
    if (!isNaN(this.numberOfSeats) && this.numberOfSeats <= 7)
      this.validation = true;
    else this.validation = false;
  }

  submitNoOfSeats() {
    if (
      this.seats.length - this.filledSeats.length < this.numberOfSeats ||
      this.numberOfSeats > 7
    ) {
      this.validation = false;
      return;
    }
    this.selectedSeats = [];
    let spacesInRow = this.getSpacesInRows();

    let max = 0;
    for (let i = 0; i < spacesInRow.length; i++) {
      if (max < spacesInRow[i]) max = spacesInRow[i];
      if (spacesInRow[i] >= this.numberOfSeats) {
        max = spacesInRow[i];
        break;
      }
    }

    let index = spacesInRow.indexOf(max);
    let counter = 0;
    for (let i = index * 7; i < index * 7 + 7; i++) {
      if (this.filledSeats.indexOf(this.seats[i]) < 0) {
        this.selectedSeats.push(this.seats[i]);
        counter++;
      }
      if (counter === this.numberOfSeats) break;
    }

    let prevRow = index - 1;
    let nextRow = index + 1;
    while (counter <= this.numberOfSeats) {
      if (prevRow >= 0) {
        for (let i = prevRow * 7; i < prevRow * 7 + 7; i++) {
          if (this.filledSeats.indexOf(this.seats[i]) < 0) {
            this.selectedSeats.push(this.seats[i]);
            counter++;
          }
          if (counter === this.numberOfSeats) break;
        }
      }
      if (counter === this.numberOfSeats) break;
      if (nextRow < 12) {
        for (let i = nextRow * 7; i < nextRow * 7 + 7 && i < 80; i++) {
          if (this.filledSeats.indexOf(this.seats[i]) < 0) {
            this.selectedSeats.push(this.seats[i]);
            counter++;
          }
          if (counter === this.numberOfSeats) break;
        }
      }
      if (counter === this.numberOfSeats) break;
      prevRow--;
      nextRow++;
    }
  }

  getSpacesInRows() {
    let spacesInRow = [];
    let counter = 0;
    for (let i = 0; i < this.seats.length; i++) {
      if (this.filledSeats.indexOf(this.seats[i]) < 0) {
        counter++;
      }
      if ((i + 1) % 7 === 0) {
        spacesInRow.push(counter);
        counter = 0;
      }
      if (i === this.seats.length - 1) {
        spacesInRow.push(counter);
        counter = 0;
      }
    }
    return spacesInRow;
  }

  bookSeats() {
    if (!this.selectedSeats.length) {
      alert("Please enter the number of seats and click on submit first!");
      return;
    }
    let reqBody = {
      passengerId: this.passengerId,
      seatNumbers: this.selectedSeats,
    };
    this.rs.reserveSeats(
      reqBody,
      (res) => {
        this.rs.getSeats().subscribe((res) => {
          this.filledSeats = res["response"]["filledSeats"];
          this.errMess = null;
        });
        this.success = true;
      },
      (errRes) => {
        this.errMess = errRes;
        console.error(errRes);
      }
    );
  }

  deleteAllSeats() {
    this.rs.deleteAllReservations().subscribe((res) => {
      this.rs.getSeats().subscribe((res) => {
        this.filledSeats = res["response"]["filledSeats"];
        this.selectedSeats = [];
        this.errMess = null;
      });
    });
  }
}
