interface exerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (target: number, hoursPerDay: Array<number>): exerciseReport => {

    let rating = 1;
    let ratingDescription = "Default";

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
    }

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

export { calculateExercises };