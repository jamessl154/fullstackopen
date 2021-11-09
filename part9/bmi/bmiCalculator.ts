const calculateBmi = (height: number, weight: number) => {

    if (process.argv.length < 4 || process.argv.length > 4) {
        throw new Error("Correct usage:\n" +
        "npm run calculateBmi <height> <weight>\n" +
        "npm run calculateBmi 180 74\n" +
        "height in centimetres, weight in kilograms");
    };
    
    if (isNaN(Number(process.argv[2])) ||
        isNaN(Number(process.argv[3]))) {
        throw new Error("Invalid inputs, height and weight must be integer symbols");
    };
    
    let bmi: number = weight / (height / 100) ** 2;

    if (bmi <= 18.4) console.log("Underweight");
    else if (bmi > 18.4 && bmi < 25) console.log("Normal range");
    else if (bmi >= 25 && bmi < 30) console.log("Overweight");
    else if (bmi >= 30) console.log("Obese");
};

try {
    calculateBmi(Number(process.argv[2]), Number(process.argv[3]));
} catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
};