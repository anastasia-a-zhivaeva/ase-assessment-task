import { RecommendationDto, RecommendationRequest } from "./models";
import { RecommendationServiceFactory } from "./services";
import { supportedRecommendationServices } from "./supported-recommendation-services";

/**
 * In real implementation, recommendations are retrieved by workers that poll tasks from message queue,
 * update cache with recent recommendations and store them in the database
 * (the functionality of notifying a user when new recommendations are available is also possible)
 */
const recommendationServiceFactory = new RecommendationServiceFactory();

export async function getRecommendations(requestParams: RecommendationRequest): Promise<Array<RecommendationDto>> {
    const recommendationsArrays = await Promise.all(
        supportedRecommendationServices.map(async serviceInfo => {
            try {
                return await recommendationServiceFactory
                    .createRecommendationService(serviceInfo.name, serviceInfo)
                    .getRecommendation(requestParams);
            } catch(error) {
                console.log(error);
                return [];
            }
        })
    );
    return recommendationsArrays.flat().sort((a, b) => a.priority < b.priority ? 1 : -1);
}

