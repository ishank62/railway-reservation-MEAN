# RAILWAY SEAT RESERVATION APP:

## **Key Features**
1. Concurrent reservation of same seats by different users is being handled by appropriate messages.
2. In cases where user wants to book many seats and if that many empty seats are not available in a single row then, the maximum number of seats are assigned in a single row from the entry point of the coach and rest of the seats are assigned nearby this row.
3. Feature to reset all reservations for all users. This feature is implemented for the case when user wants to test the application afresh.

## Click on below link to see hosted app:-
<a href="http://13.234.225.140" target="_blank">DEMO OF THE PROJECT</a> (http://13.234.225.140)


## Techstack Used:
1. <strong>Angular</strong> - Frontend Framework
2. <strong>Nodejs</strong> - Server-side environment
3. <strong>Express</strong> - Server-side Framework
3. <strong>MongoDb</strong> - Database
4. <strong>Docker</strong> - Containerization used in Backend
5. <strong>Nginx</strong> - Web Server for Hosting Frontend
6. <strong>AWS EC2</strong>(Amazon Web Services Elastic Compute Cloud) - Cloud Service to Host the app


## Project Setup:

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

## Preview of the App:-

### Legend

1. Green coloured boxes - <strong>Seats chosen by user to be booked</strong>
2. Grey coloured boxes - <strong>Seats that are Filled (not empty)</strong>

![Screenshot 1](https://github.com/ishank62/railway-reservation-MEAN/blob/master/images/reservation.png)
