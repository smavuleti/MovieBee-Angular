
# MovieBee- Angular Client Application

## Objective
The client-side for the MovieBee application using Angular, based on its existing server-side code ([MovieBee-API](https://github.com/smavuleti/MovieBee-API)), with supporting documentation.

---

## Context
This project aims to create a responsive, single-page application for MovieBee using Angular. The application will handle data interaction through pre-defined REST API endpoints, offering a modern, user-friendly interface for managing movie-related information.

### Why Angular?
Angular is a versatile framework suited for large-scale projects and complex user interfaces. Its built-in modules and services make it ideal for building robust and maintainable applications.

---

## Design Criteria

### User Stories
- **As a user,** I want to receive information on movies, directors, and genres to learn more about movies I’ve watched or am interested in.
- **As a user,** I want to create a profile to save data about my favorite movies.

### Key Features
1. **Welcome View**  
   - Users can log in or register an account.
2. **Main View**  
   - Displays a list of all movies once authenticated.
3. **Single Movie View**  
   - Shows additional details about a selected movie.
   - Includes:
     - A button to navigate to the director view for details about the movie's director.
     - A button to navigate to the genre view for details about the movie's genre.

---

## Technical Requirements

### Development Stack
- **Framework:** Angular (version 9 or later)
- **Environment:** Node.js (latest version) with npm

### Features
- User registration and login forms.
- User authentication to access the app's main features.
- Designed using Angular Material for a modern UI.
- Typedoc for codebase comments.
- Technical documentation using JSDoc.

---

## Getting Started

### Prerequisites
- Install the latest version of [Node.js](https://nodejs.org) and npm.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve
   ```
4. Open the app in your browser at `http://localhost:4200`.

---

## Documentation

### Typedoc
The codebase includes Typedoc comments for improved readability and maintenance. Generate documentation with:
```bash
npx typedoc
```

### JSDoc
Technical documentation for the project is included, written using JSDoc standards.

---

## Deployment
The application is deployed on GitHub Pages. Use the following command to build the app for deployment:
```bash
ng build --prod --output-path docs --base-href /<repository-name>/
```
Then push the changes to the `gh-pages` branch of the repository.

---

## Contributions
Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
