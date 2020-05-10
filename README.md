This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Acknowledgement

First of all thank you for the test ^^, because it was a real experience for me. I've never used a data visualization library before.

### Blocking point
The main difficulty for me during the test was to work with a new library.
I chose "Kendo UI" because according to the documentation it is rather well integrated in React, but of course I don't know yet which components are best suited for each use case.

### If I had to do it again
I'll do all the calculations to give on the back-end side and not on the client side, because with a very large dataset, I think that the browser can't be reactive enough because of the number of calculations.

### Optimization side
We can first of all Lazyload the heaviest components, and especially use selectors (for example from the reselect library) to avoid recalculating the data of our store which can be large.

### Stack
React
Typescript
Webpack (under the hood)
babel (under the hood)
Redux
Redux-Thunk
React-Router
Axios
Jest
Kendo

## Available Scripts

In the project directory, you can run:

### server `npm start`
First run the server on http://localhost:3000

### client `npm start`
Login page: http://localhost:3001
Dashboard page: http://localhost:3001/dashboard

### `npm test`
I have tested only dataRules.ts (just to show that i know how to use Jest) 

### Login & Password
Login: urtoob
password: ToobRU
