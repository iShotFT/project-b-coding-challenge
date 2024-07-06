export type EmailsTypes = EmailsJobNewEmployeeData; // Decided to use a union type for future extensibility

export interface EmailsJobNewEmployeeData extends EmailsJobData {
    type: 'newEmployee',
    fullName: string,
}

export interface EmailsJobData {
    to: string,
}