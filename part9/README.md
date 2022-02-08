## part9
https://fullstackopen.com/en/part9

[TypeScript](https://www.typescriptlang.org/docs/) is a typed superset of JavaScript. Some of its advantages are static type checking to reduce runtime errors, code-level documentation and a better development experience in an IDE i.e. more relevant suggestions using VSCode with IntelliSense. Used [ts-node](https://github.com/TypeStrong/ts-node) that allows execution of TS files in Node without compiling. Imported types from the community project [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

- bmi
  - Developed ```bmi/bmiCalculator.ts``` that calculates BMI using height and weight inputs. The program exposes an interface containing the functions apiBmi and cliBmi that both validate their input types and rely on the function calculateBmi. cliBmi can be used by running ```npm run cliBmi <height> <weight>```. apiBmi is used in the GET /bmi route of the Express server in ```bmi/index.ts``` with height and weight as [query string parameters](https://expressjs.com/en/api.html#req.query). ```bmi/exerciseCalculator.ts``` is created similarly to the bmiCalculator but it generates an exercise report object after receiving input of target hours of exercise and an array of hours of exercise completed over an arbitrary number of days. To run cliExercises: ```npm run cliExercises <targetHours> <day1hours> <day2hours> e.t.c.```. Similarly the exerciseCalculator is integrated into the POST /exercises route of the Express server.
- half-stack
  - TODO
- patientor
  - Developed the backend for [this](https://github.com/fullstack-hy/patientor) existing frontend. TODO