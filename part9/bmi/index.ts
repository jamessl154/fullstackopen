import express from 'express';
import { apiBmi } from './bmiCalculator';
import { calculateExercises as exerciseApi } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  res.send(
    apiBmi(
      Number(req.query.height),
      Number(req.query.weight)
    )
  );
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const { target, daily_exercises } = req.body;

  // check the properties on request body exist
  if (!target || !daily_exercises) res.send({ error: "parameters missing" });
  
  else if (
    // checking that target is a number and that daily exercises an array of only numbers
    isNaN(Number(target)) || !Array.isArray(daily_exercises) || !daily_exercises.every((x) => typeof x === "number")
  ) res.send({ error: "malformatted parameters" });

  else {
    // eslint-disable-next-line
    const result = exerciseApi(Number(target), daily_exercises);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});