## part6
https://fullstackopen.com/en/part6

https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867

Learned about [Flux](https://facebook.github.io/flux/docs/in-depth-overview/) architecture and the most popular implementation, [Redux](https://redux.js.org/) for state management.

- unicafe-redux
  - Cloned the app from [this](https://github.com/fullstack-hy/unicafe-redux) repository and changed it's state management from local component state to Redux. Also wrote tests for the reducer in ```unicafe-redux/src/reducer.test.js``` that use [deep-freeze](https://github.com/substack/deep-freeze) to ensure the reducer is correctly defined as a pure function (does not [mutate state](https://redux.js.org/style-guide/style-guide#priority-a-rules-essential)).
- redux-anecdotes
  - Revisited our anecdotes frontend app from part1 and modified it to use Redux for state management which we then implemented using the [React-Redux](https://react-redux.js.org/) library. This reduced repetition by allowing us to make [action creator](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#action-creators) functions and call them with the useDispatch hook inside components. The useSelector hook also simplified the process of retrieving state that we wanted from the store.

  - Added a simple backend using [json-server](https://github.com/typicode/json-server) found in ```redux-anecdotes/db.json``` and integrated it with the new Redux state in the app. We then used the [redux-thunk](https://github.com/reduxjs/redux-thunk) library that allowed us to implement asynchronous actions to abstract away details and keep the components clean.

  - We also looked at the legacy [connect](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md) function that is used to pass action creators and state to components through props (mapDispatchToProps and mapStateToProps parameters). I implemented the connect function in the components AnecdoteForm, Filter and Notification.

  - Finally, I fixed a notification bug that we introduced with this code:
    ```
    dispatch(setNotification(`new anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    ```
    The problem with this code is that each time a setNotification action is dispatched to the store, changing the notification to visible and setting the text, a clearNotification action is dispatched 5 seconds later. If another notification event happens within 5 seconds, the new notification is cut off by the original clearNotification action that is dispatched after the original setTimeout. My solution was to store the timeoutId created by the last setTimeout call in the Redux store, then call clearTimeout with that timeoutId when another notification event occurs.