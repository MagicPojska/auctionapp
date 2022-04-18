<div id="top"></div>

<!-- PROJECT TITLE -->
<br />
<div align="center">
  
  <h3 align="center">Auction App</h3>

  <p align="center">
    My ABH internship project where you can place competitive bids on assets.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Roadmap</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
  </ol>
</details>

You can see the demo [here](https://auction-app-react.herokuapp.com/)


<!-- ABOUT THE PROJECT -->
## About The Project

This is a project made on an internship with the guidance of my mentor. In this app you will be able to bid with other people and buy products.
 <br />
 
 ## Features

| 1. month | 2. month | 3. month |
| --- | --- | --- |
| ERD, project skeleton | Shop page: All filters | |
| Navbar,footer and static pages | Switch between list/grid preview | |
| Deployment | Sorting products | |
| Landing page | Add new item | |
| Shop page: Filter by category | User profile page | |
| Product overview page | 'Did you mean?' search feature | |
| Bidding process |  |  |

 
 ### Root directory layout

    .
    ├── client   
    ├── server
    └── README.md
    
  
<br />
  
### Client directory layout

    .
    ├── public
    ├── src
    ├── .gitignore
    ├── package.lock.json
    ├── package.json
    └── tailwind.config.js

<br />
  
### SRC directory layout

    .
    ├── common
    ├── components
    ├── contexts
    ├── pages
    ├── utilities
    ├── App.jsx
    ├── index.css
    └── index.js
    
<br />
    

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [React.js](https://reactjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [React-Toastify](https://www.npmjs.com/package/react-toastify)
* [React-router-dom](https://reactrouter.com/)
* [Use-react-router-breadcrumbs](https://www.npmjs.com/package/use-react-router-breadcrumbs)
* [React-icons](https://react-icons.github.io/react-icons/)

<br />

* [Spring boot](https://spring.io/projects/spring-boot)
* [Spring security](https://spring.io/projects/spring-security)
* [Swagger](https://swagger.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Lombok](https://projectlombok.org/)
* [JJWT](https://github.com/jwtk/jjwt)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Install NPM
* npm
  ```sh
  npm install npm@latest -g
  ```

### Preparation

1. Clone the repo
   ```sh
   git clone https://github.com/MagicPojska/auctionapp.git
   ```
2. Install NPM packages in client folder
   ```sh
   cd client
   npm install
   ```
3. Start client
   ```sh
   npm start
   ```
4. Start PostgreSQL server on your PC
5. Start the server by opening the server/auctionapp folder in your preffered IDE and RUN the project
  

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- Deployment -->
## Deployment

In this section I will explain how to deploy the app on Heroku.

Before we start you should deploy this app to your github.

Deploying database and server:
1. Register on https://heroku.com/apps
2. Create new application
3. Then we go to the Resources tab, select Heroku Postgres and add it to our application.
4. Change the application.properties credentials to the provided credentials for your deployed PostgreSQL database
5. Now we will go to the Deploy tab and make the deployment settings. By clicking on the Connect to GitHub option, we indicate that we will deploy the application via GitHub.
6. If we want to have automatic deploy in every change to be made in the main branch, we must press the Enable Automatic Deploys button.
7. You will need to go to Settings tab and add a Config Var: PROJECT_PATH = server/auctionapp
8. After that step you will need to add 2 buildpacks:
  - https://github.com/timanovsky/subdir-heroku-buildpack
  - heroku/java
9. Now go back to the Deploy tab and click on button that says: "Deploy Branch"

Your server is now deployed.

<br />

Deploying client:
1. Create new application
2. Go to the Deploy tab and make the deployment settings. Click on GitHub deployment method
3. If we want to have automatic deploy in every change to be made in the main branch, we must press the Enable Automatic Deploys button.
4. You will need to go to Settings tab and add 2 Config Vars:
  - PROJECT_PATH = client
  - REACT_APP_API_URL = "YourNewServerURL"
5. After that step you will need to add 2 buildpacks:
  - https://github.com/timanovsky/subdir-heroku-buildpack
  - https://github.com/mars/create-react-app-buildpack.git
6. Now go back to the Deploy tab and click on button that says: "Deploy Branch"

There you go! You have successfully deployed the app!

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Safet Pojskić - pojskicsafet@gmail.com
