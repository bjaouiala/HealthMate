export interface PredictionResponse {
    risk_level: string; // The risk level returned by the API
    feedback: string[]; // An array of feedback messages
}