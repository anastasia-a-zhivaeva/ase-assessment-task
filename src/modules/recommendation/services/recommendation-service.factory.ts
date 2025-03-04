import { RecommendationServiceTemplate } from "./recommendation-service.template";
import { RecommendationService1 } from "./recommendation-service1.service";
import { RecommendationService2 } from "./recommendation-service2.service";

/**
 * RecommendationServiceFactory creates RecommendationService depending on provided type (Abstract Factory Pattern)
 */
export class RecommendationServiceFactory {
    public createRecommendationService(type: string, serviceInfo: any): RecommendationServiceTemplate<any, any, any, any> {
        switch (type) {
            case "service1":
                return new RecommendationService1(serviceInfo);
            case "service2":
                return new RecommendationService2(serviceInfo);
            default:
                throw new Error(`Recommendation service of type ${type} not found`);
        }
    }
}
