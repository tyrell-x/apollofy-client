

# **APOLLOFY TYRELL**

<center>
<img src="./src/assets/images/tyrell.png" width="600px"> </img>

</center>

<hr>

**Produced by Tyrell Enterprise.**

<br>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<p>

</p>

<br>

## Repo

- [apollofy-music-project](https://github.com/assembler-school/apollofy-music-project.git)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributors</a></li>
  </ol>
</details>

## About the project
---
<center>
<img src="./src/assets/images/screenshot.png" width="600px"> </img>

</center>
<br>
<br>
<br>

<p >Apollofy is an academic project which purpose is to understand in depth the basis of MERN Stack. THis is a project where we as a group develop a platform where the user will be able to upload and play music of all kind.</p>
<br>

## Build with 🛠️

In order to accomplish the succesfull deployment of this project, we had to use a very comprehensive stack of technologies, the following list mentions the ones we used:

* [NodeJS](https://nodejs.org/es/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [ReactJs](https://es.reactjs.org/)
* [Redux](https://es.redux.js.org/)
* [FireBase](https://firebase.google.com/)
* [Cloudinary](https://cloudinary.com/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
<br>

### **Prerequisites**

Firstly, you would need to install **nodejs** and **yarn** in your OS, it is essential in order to manage the different packages. <br>
Go to [NodeJs web page](https://nodejs.org/es/) download and install the program.

  ```sh
  npm install -g yarn
  ```

## Installation

### **Install Dependencies**

Before intializaing the installation of all the mentioned packages above, clone the repository if you have bash in your computer, please execute the following:

  ```sh
  git clone https://github.com/tyrell-x/apollofy-client.git
  ```

*...and then install yarn install in order to download the dependencies and libraries*

  ```sh
  yarn install 
  ```

The `web` package will be run by default in the following url:
`http://localhost:3000`.
### Firebase

This app uses Firebase Auth as the auth provider, so you will need to configure
it first.

Once you have created a firebase app in the firebase console, you will need to
copy the settings and paste each value of the config object as environment
variables.

### Environment variables

These are the required environment variables for the config of the app. The ones
that start with `FB_` are needed for the Firebase Admin config.

These are all used in the `packages/web/src/services/auth/auth.js` file:

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
```

## Env variables

```bash
# .env
REACT_APP_API_KEY=AIzaSyCB9tP9exKR1RoNjTIlZ3IJPh2Cr1efZNg
REACT_APP_AUTH_DOMAIN=apollofy-9e653.firebaseapp.com
REACT_APP_PROJECT_ID=apollofy-9e653
REACT_APP_STORAGE_BUCKET=apollofy-9e653.appspot.com
REACT_APP_MESSAGING_SENDER_ID=957919119674
REACT_APP_APP_ID=1:957919119674:web:94c66dbd2720c164546803
REACT_APP_API_BASE_URL=http://localhost:4000
 
REACT_APP_CLOUDINARY_CLOUD_NAME=tyrell
REACT_APP_CLOUDINARY_TRACK_UPLOAD_PRESET=upload-track
```
<br/>
<br>

<h1>Contributors</h1>

<table>
  <tr>
    <td align="center"><a href="https://github.com/wsierra010"><img src="https://avatars.githubusercontent.com/u/73594033?v=4" width="100px;" alt=""/><br /><sub><b>Wilmer Sierra Salgado</b></sub></a><br /><a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Code">💻</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Tests">⚠️</a> <a href="#content-danilucaci" title="Content">🖋</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Documentation">📖</a> <a href="#ideas-danilucaci" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-danilucaci" title="Maintenance">🚧</a> <a href="#mentoring-danilucaci" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-danilucaci" title="Project Management">📆</a> <a href="#tool-danilucaci" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/joan-carri%C3%B3n-anaya-a074851a0/"><img src="https://avatars.githubusercontent.com/u/32818594?v=4" width="100px;" alt=""/><br /><sub><b>Pablo Caravaca Calvo</b></sub></a><br /><a href="https://github.com/CCPablo" title="Code">💻</a> <a href="#content-JCarri14" title="Content">🖋</a> <a href="#data-JCarri14" title="Data">🔣</a> <a href="#design-JCarri14" title="Design">🎨</a></td>
    <td align="center"><a href="http://www.danilucaci.com"><img src="https://avatars.githubusercontent.com/u/45830117?v=4" width="100px;" alt=""/><br /><sub><b>Ignacio Fernandez Cerro</b></sub></a><br /><a href=" https://github.com/IGNACIOFC" title="Code">💻</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Tests">⚠️</a> <a href="#content-danilucaci" title="Content">🖋</a> <a href="https://github.com/assembler-school/Apollofy/commits?author=danilucaci" title="Documentation">📖</a> <a href="#ideas-danilucaci" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-danilucaci" title="Maintenance">🚧</a> <a href="#mentoring-danilucaci" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-danilucaci" title="Project Management">📆</a> <a href="#tool-danilucaci" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/Leyber91"><img src="https://avatars.githubusercontent.com/u/10093491?v=4" width="100px;" alt=""/><br /><sub><b>Luis Blanco Rodriguez</b></sub></a><br /><a href="https://github.com/Leyber91" title="Code">💻</a> <a href="#content-JCarri14" title="Content">🖋</a> <a href="#data-JCarri14" title="Data">🔣</a> <a href="#design-JCarri14" title="Design">🎨</a></td>
  </tr>
</table>


<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/tyrell-x/apollofy-client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/tyrell-x/apollofy-client/network/members

[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

