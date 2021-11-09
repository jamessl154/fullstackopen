interface exerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
};

interface exerciseInput {
    target: number;
    hoursPerDay: Array<number>;
};

const calculateExercises = (target: number, hoursPerDay: Array<number>): exerciseReport => {

    let rating;
    let ratingDescription;

    const sum = hoursPerDay.reduce((a, b) => a + b, 0);
    const average = (sum / hoursPerDay.length);
    const trainingDays = hoursPerDay.reduce((a, b) => b > 0 ? a + 1 : a, 0);

    if (Math.round(average) === target) {
        rating = 2;
        ratingDescription = 'Well done on hitting your target.';
    } else if (Math.round(average) > target) {
        rating = 3;
        ratingDescription = 'Congratulations on exceeding your target.';
    } else if (Math.round(average) < target) {
        rating = 1;
        ratingDescription = 'You missed your target.';
    };

    return {
        periodLength: hoursPerDay.length,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseArguments = (args: Array<string>): exerciseInput => {

    if (args.length < 4) throw new Error("Correct usage:\n" +
    "npm run calculateExercises <target hours> <hours day 1> <hours day 2> e.t.c...\n" + 
    "npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4\n");

    let hoursPerDay = [];

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error("Invalid inputs, all hours must be integer symbols");
        if (i >= 3) hoursPerDay.push(Number(args[i]));
    };

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
};