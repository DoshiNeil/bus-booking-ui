# Bus Booking UI

https://github.com/DoshiNeil/bus-booking-ui/actions/workflows/dev-build-and-deploy/badge.svg

## Introduction

This is a webapp build with react. The app has 2 routes

- `/reservations`
- `/dashboard`

Reservation route depicts the bus layout and allows the user to make bookings from here.
On completion of the booking the user is router to Dashboard. Here the use can see the booking details.
From the Dashboard, the user can

- Delete a reservation
- Update name or email address
- The seat number and the booking date cannot be changed

Any changes made on the Dashboard are reflected on the Reservation page and vice-versa.

## Technical Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
For visual representation of the bus seat layout, have used a react wrapper over Canvas element.
Since this being a demo app, the backend is mocked with LocalStorage. No styling library was used.

## Dependencies

| Library      | Used For                                     |
| ------------ | -------------------------------------------- |
| react-konva  | Wrapper around Canvas element in react       |
| react-spring | Animation library used for sidebar animation |
| react-icons  | Used for icons in the application            |
