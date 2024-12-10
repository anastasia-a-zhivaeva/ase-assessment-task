export interface RecommendationDto {
    /**
     * Priority from 0 to 1000
     */
    priority: number;

    /**
     * Title (short description)
     */
    title: string;

    /**
     * Description
     */
    description?: string;
}
