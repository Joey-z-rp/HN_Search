This project is for searching hacker stories and comments through [APIs](https://hn.algolia.com/api) provided by Hacker News. 

## Features

After the page is loaded, type in the content you want to search and pause, a search will be triggered. Hitting `Enter` key or clicking on the `Search` button will also fire the search.

The results are returned in paged format. You can navigate around through the pagination bar under the results.

You can change the search settings by clicking on the gear icon at top right corner. After changing the settings, please click `Apply` button on the side panel and a search request with new settings will be sent.

### Note:

As all the requests are sent from browser, if your browser does not allow cross origin content, you may get `Network error` error message. To get around this, please use browser plugins such as [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) for Chrome or other similar technologies. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner and run all the tests.<br>

### `npm build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Main Tech Stacks used

### React

To construct UI components

### Redux

To manage state for components, handle events

### Express

To serve static content

### Jest

To run tests and provide test coverage
