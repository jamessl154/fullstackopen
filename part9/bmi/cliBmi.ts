import { cliBmi } from "./bmiCalculator";

try {
    cliBmi(Number(process.argv[2]), Number(process.argv[3]));
} catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
};