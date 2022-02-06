## part7
https://fullstackopen.com/en/part7

- routed-anecdotes
  - Added [React Router v5](https://v5.reactrouter.com/web/guides/quick-start) to the app cloned from [this](https://github.com/fullstack-hy/routed-anecdotes) repository. We implemented switching between different views with the help of the useHistory (useNavigate in [React Router v6](https://reactrouter.com/)) and useParams hooks.
- country-hook
  - Learned to create custom hooks to extract component logic into reusable functions. Refactored the dataforcountries app from part2 using custom hooks where appropriate using [this](https://github.com/fullstack-hy/country-hook) repository as the starting point. Implemented the useField hook that abstracted details of input state management and allowed us to spread props neatly.
- ultimate-hooks
  - Added a useResource hook after cloning [this](https://github.com/FullStack-HY/ultimate-hooks/blob/main/src/App.js) repository. The hook abstracts the detail of fetching and creating resources with axios. Depending on the amount repetition between resources we can get alot of value from adding services to this single hook. Along with the useField hook this gave us the ability to write clean and concise code.

In this part we also explored under the hood of the create-react-app tool to show how to configure Webpack to bundle JavaScript and React apps. We looked at how to set up a [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) for an easier development workflow that bundles in memory and how to configure the dev-server to generate a [source map](https://webpack.js.org/configuration/devtool/) that helps development by generating more detailed error messages when things break.

Learned the basics of [class components](https://reactjs.org/docs/react-component.html) and [lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) in this part.

The last exercises of this part required refactoring the full bloglist app from parts 4 and 5, adding new functionality, adopting Redux state management, adding React Router and styling it, for which I used [MaterialUI](https://mui.com/).