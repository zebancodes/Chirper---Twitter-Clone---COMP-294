# Chirper (Team 2)

## Project Overview
Due to recent events, a few former Twitter employees are upset with the current state of the company and are looking to start their own social network. Their new Twitter alternative, called Chirper, seeks to reimagine what Twitter should be. Chirper messages (called Chirps) are limited to 1000 characters, unlike the 280 character limit Twitter has. Users will also have the ability to edit and undo Chirps, contrary to on Twitter. The initial objectives of Chirper will be met over the next phases of the project.  

### Contributors

* Evan Horsley: Team Lead
* Colin Zollars: Sr. Developer
* Michael Koons: Developer
* Danielle Wagner: Developer

### Tech Stack:
* DB: MongoDB Atlas
* Backend: Node.js + Express
* Frontend: React 18.x.x + MaterialUI 5.x.x

# 1: Technology Stack Setup Notes (Windows)
> The commands below should be executed in a terminal such as Powershell. They may also work in Command Prompt but this was not tested.

> Note: The tech stack will work using WSL2 with an Ubuntu image.

## 1.1 - Install Visual Studio Code
* See [https://code.visualstudio.com/](https://code.visualstudio.com/).

## 1.3 - Install Docker for Windows
* See [https://www.docker.com/get-started](https://www.docker.com/get-started).

## 1.4 - Install Node.JS (version 16... LTS)
* See [https://nodejs.org/en/](https://nodejs.org/en/).

## 1.5 - Install Make (requires Node.js and NPM)
```
npm install -g make
```

## 1.6 - Install Yarn (requires Node.js and NPM)
```
npm install -g yarn
```

## 1.7 - Configure .env File

* For the backend (api/), copy the `base.env` file to `.env` and fill in the port you'd like the API to run on (default is 8000) and fill in the MongoDB Atlas URL for your instance.

* For the frontend (web/), copy the `base.env` file to `.env` and fill in the URL the API will be running on (in our case the default is http://localhost:8000/).


# 2: Build and Start/Stop Docker containers

* There is a Makefile configured to run the project in Docker. Running `make build` will build both the backend and frontend. Running `make start` will start both containers.