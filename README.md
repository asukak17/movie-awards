# Shoppies :movie_camera:

## Overview

Shoppies allows you to choose your five favorite app for movie awards for entrepreneurs!
Search by the title, click "Nominate this" button to select, remove one from nomination by simply clicking "Remove this" button.

## How to use

1. Type a title of your favorite movie in the search bar
2. Once you find one, click "Nominate this" button to nominate
3. Check the star in nav bar to check how many movies you picked
4. Click the start or click the humberger menu to check which movies you nominated
5. Click "Remove this" button on nominations to remove from the list
6. Pick five titles for nominations :smile:

## Getting Started

You can see [the demo of this project here](https://the-shoppies-asuka.netlify.app/)

or to start locally:

1. Clone the repository

```
git clone https://github.com/asukak17/movie-awards.git
```

2. CD into the folder and install dependencies

```
cd movie-search-app
yarn install
```

3. create an env file and add

```
REACT_APP_API_KEY={TYPE_YOUR_OMDB_API_KEY}
```

4. Run and you can view the app at http://localhost:3000

```
yarn start
```

## Tech Stack

- TypeScript
- create-react-app
- prettier
- material-ui
- React context/useReducer api
- react-router

### Some extras I worked on:

- Added localStorage to save the nomination list if the user leaves the page
- Responsive design that can be used in mobile
- Show how many nominations are selected in a navigation bar
- Type something and press enter on nominations page moves to the search result

### Things that I would continue working on to improve:

- Use GraphQL server to make request
- Write test with jest to prove that this application fulfills the requirements
- Use Polaris UI kit as a ui component library
- Show error messages when there are too many results or the request did not go through
- improve accessibility including keyboard/void navigation
- infinite scroll of search result with pagination
- set default image when the image url is not available

- use tsdx for even easier TypeScript setup

## Note

This was a great opportunity to learn and show what I have worked so far in my developer experience. Even though I used create-react-app, I used it with a TypeScript template since this prevents me from making unnecessary errors even before running the application. I wanted to use a state management system for better developer experience, and I challenged myself to use the unfamiliar tools, React useReducer and context api. I am used to Redux/Redux-toolkit/Redux Saga in my current work environment, so I did not feel much difficulty dealing with it, but I found it much easier to set up with no new dependencies required especially for a small application like the Shoppies. As for the component library, I used material-ui since I have used it before and I like the ui design and usability, but I regret I could not try Polaris since I learnt about it towards the end of this challenge and due to the time constraints. I looked at the documentation and I have played around with it, and I liked the experience. I will use it when I have a chance to build an e-commerce website with React next time.

## Resources

Open-source illustrations thanks to [unDraw](https://undraw.co/)
