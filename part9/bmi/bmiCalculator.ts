const calculateBmi = (height: number, weight: number): string => {

    let bmi: number = weight / (height / 100) ** 2;

    if (bmi <= 18.4) return("Underweight");
    else if (bmi > 18.4 && bmi < 25) return("Normal range");
    else if (bmi >= 25 && bmi < 30) return("Overweight");
    else return("Obese");
};

const cliBmi = (height: number, weight: number) => {

    if (process.argv.length < 4 || process.argv.length > 4) {
        throw new Error("Correct usage:\n" +
        "npm run calculateBmi <height> <weight>\n" +
        "npm run calculateBmi 180 74\n" +
        "height in centimetres, weight in kilograms");
    };
    
    if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) {
        throw new Error("Invalid inputs, height and weight must be integer symbols");
    };
    
    console.log(calculateBmi(height, weight))
};

const apiBmi = (height: number, weight: number) => {

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        return {
            error: "malformatted parameters"
        }
    }

    const result = calculateBmi(Number(height), Number(weight));

    return {
        weight,
        height,
        bmi: result
    };
};

export { apiBmi, cliBmi };