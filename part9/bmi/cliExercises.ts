import { calculateExercises } from "./exerciseCalculator";

interface exerciseInput {
    target: number;
    hoursPerDay: Array<number>;
}

const parseArguments = (args: Array<string>): exerciseInput => {

    if (args.length < 4) throw new Error("Correct usage:\n" +
    "npm run calculateExercises <target hours> <hours day 1> <hours day 2> e.t.c...\n" + 
    "npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4\n");

    const hoursPerDay = [];

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error("Invalid inputs, all hours must be integer symbols");
        if (i >= 3) hoursPerDay.push(Number(args[i]));
    }

    return {
        target: Number(args[2]),
        hoursPerDay
    };
};

try {
    const { target, hoursPerDay } = parseArguments(process.argv);
    console.log(calculateExercises(target, hoursPerDay));
} catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
}