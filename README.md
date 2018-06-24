# Tapped

A social application for craft beer enthusiasts, Tapped was the capstone project for my studies at Flatiron School. This project started life as an event manager for bottle shares, allowing users to create events and invite other users, who can then respond to invitations and discuss events or post photos on the event's page.

Since finishing school, I've been working on merging parts of a previous project - a beer/brewery database and beer review application, built in collaboration with [Oleg Chursin](https://github.com/olegchursin) as the final project for our React studies - into this. This integration is now mostly complete and, time permitting, I may continue to add features such as private messages, friend relationships for users, geolocation to find nearby public events, SSL, etc.

If you'd like to take a look at the deployed application it's currently hosted at [http://tapped.kevinrandles.com](http://tapped.kevinrandles.com), and the repo for the Rails API backend can be found at [https://github.com/krandles/bottle_share_backend](https://github.com/krandles/bottle_share_backend).

## Technical Notes

Front-end was built using React, Redux, and React Router, and styled using Semantic UI components. I also utilized Filestack to simplify the process of implementing file uploads, and Moment.js to take the pain out of JS date management.

Back-end is a RESTful JSON API built with Ruby on Rails, using a PostgreSQL database.

## Installation

- Fork and clone this repo
- `yarn install` or `npm install` to install dependencies
- API keys for Google Maps and Filestack should be set as environment variables (REACT_APP_GOOGLE_MAPS_KEY and REACT_APP_FILESTACK_KEY) or otherwise configured
- `yarn start` or `npm start` to launch

## Concerns

- Need to implement data validation, client and server-side (currently WIP)
- Currently all data is fetched on initial load or at login. While this works fine for the purposes of this project, it would need to be refactored as the size of the database grows.
- Individual beer/brewery pages still need to be built out
