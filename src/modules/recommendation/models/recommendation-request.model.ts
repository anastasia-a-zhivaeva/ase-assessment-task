export interface RecommendationRequest {
    /**
     * Weight in kg
     */
    weight: number;

    /**
     * Height in cm
     */
    height: number;

    /**
     * Date of birth as UTC string
     */
    dateOfBirth: string;
}
