# RAILWAY SEAT RESERVATION APP:

## **Key Features**
1. Concurrent reserving of seats by different users is being handled. by appropriate messages.
2. In cases where we demand many seats in one row then if they are not available, maximum no. of seats are assigned in a single row from the entry point of the coach and rest of the seats are assigned nearby this row.
2. Option to reset all reservations.

## Click on below link to see hosted app:-
http://13.234.225.140

## Techstack Used:
1. Angular - Frontend Framework
2. Nodejs - Server-side environment
3. Express - Server-side Framework
3. Mogodb - Database
4. Docker - Containerization
5. AWS(Amazon Web Services) - Cloud Service to Host the app


## Projejct Setup:

Clone this repo.

1. To run Frontend locally:-
    ```
    cd Frontend
    
    ng serve
    ```
  
2. To run backend locally:-
    ```
    cd Server
    
    docker-compose up
    ```

## Preview of the App where:-

1. Green coloured boxes means - CHOSEN SEATS
2. Grey coloured boxes means - FILLED SEATS

![Screenshot 1](https://github.com/ishank62/railway-reservation-MEAN/blob/master/images/reservation.png)
