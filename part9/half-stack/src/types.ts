interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

// https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types
interface CoursePartWithDescription extends CoursePartBase {
    description: string
}

interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;