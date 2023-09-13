# MyFlix Angular Client

## Table of Contents

- [Project Description](#project-description)
- [Who is it for?](#who-is-it-for)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
  - [Pre-requisites](#pre-requisites)
  - [Development Server](#development-server)
  - [Build](#build)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [Documentation](#documentation)
- [Code Formatting](#code-formatting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Description

The MyFlix Angular Client is a single-page, responsive movie app built using Angular. The project is designed to demonstrate skills in building modern web applications using Angular and to provide movie enthusiasts with a platform to interact with some of their (or in this case, MY) favorite movies. This client-side application interfaces with the existing [MyFlix API](https://github.com/CodyRagsdale/movie-api) to handle data through REST API endpoints.

### Who is it for?

- Movie enthusiasts who want to explore and save data about movies.
- Other developers and designers interested in a well-documented Angular project.

### Features

- **User Registration and Login Forms**: Secure and easy-to-use interface for account management.
- **Movie Gallery**: A view displaying all available movies.
- **Detailed Views**: Information on each movie, director, and genre, rich in details and additional features.
- **Profile Page**: A view where a user can view (and edit) the details they registered with, as well as view movies that have been 'favorited' from the Movie Gallery list.

### Technical Stack

- **Frontend**: Angular (version 16.2.1)
- **Backend**: Node.js and npm
- **Design**: Angular Material
- **Documentation**: Typedoc

---

## Getting Started

### Pre-requisites

Ensure you have the latest version of Node.js and npm installed.

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

## Testing

### Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

## Documentation

Code documentation is generated using Typedoc and can be found in the `/docs` directory.

To generate the documentation locally, run:

```bash
npm run docs
```

Then navigate to the /docs directory and open index.html in a browser.

## Code Formatting

This project uses Prettier for code formatting. The configuration can be found in the '.prettierrc' file. Feel free to adjust this to your preferred specifications.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
- For further help on the Angular CLI, check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
