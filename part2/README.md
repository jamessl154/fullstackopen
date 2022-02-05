## part2
https://fullstackopen.com/en/part2

This part built on introducing React from part1. It explored creating forms, controlled components and the useEffect hook to manage side-effects. It also introduced basic server-side functionality using [json-server](https://github.com/typicode/json-server) and connnecting the frontend to backend using [axios](https://github.com/axios/axios). Learned about REST and RESTful design. These are all frontend apps built with the create-react-app tool.

- courseinfo
  - Extended the courseinfo frontend app from part1. Applied learning how to refactor components into modules. Practiced higher-order methods map and reduce to render collections in different ways.
- phonebook
  - Developed a phonebook frontend app that displays names and phone numbers. Additionally it has the features: notify on actions, search filter by name, delete entries and add/update entries via a form. The data is persisted to the phonebook/db.json file using [axios](https://github.com/axios/axios) and the [json-server](https://github.com/typicode/json-server) npm package that runs with the command ```json-server -p3001 --watch db.json```. This creates a basic functional REST API from a json file. Implemented combining useEffect hook with setState to control side-effects and manage rendering.
- dataforcountries
  - Developed using a combination of all topics and methods covered in this part. On start the app fetches 250 countries from the [restcountries](https://restcountries.com/) API. The user can search for countries by typing a country's name in the filter input. As the search narrows, only 1 country will be left in the list. At which point another request is sent to the [weatherstack](http://api.weatherstack.com/current) API for the current weather conditions in that country which are then rendered to the browser. The user can manually trigger this by clicking the show button.