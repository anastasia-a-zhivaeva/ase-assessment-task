import { RecommendationDto, RecommendationRequest } from "../models";

/**
 * RecommendationService provides a skeleton of the getRecommendation algorithm (Template Method Pattern)
 * Subclasses should override specific steps of the algorithm (abstract methods)
 */
export abstract class RecommendationServiceTemplate<ServiceInfo, RequestParams, AuthParams, Recommendation> {
  protected serviceInfo: ServiceInfo;

  constructor(serviceInfo: ServiceInfo) {
    this.serviceInfo = serviceInfo;
  }

  /**
   * Return recommendations
   * @param requestParams 
   * @returns Array of RecommendationDto
   */
  public async getRecommendation(requestParams: RecommendationRequest): Promise<Array<RecommendationDto>> {
    const authParams = await this.getAuthenticationParams();
    const request = await this.getRequestParams(requestParams, authParams);
    const recommendation = await this.requestRecommendation(request);
    return this.formatRecommendation(recommendation);
  }

  /**
   * Return authentication params required for making request to recommendation service
   */
  protected abstract getAuthenticationParams(): Promise<AuthParams>;

  /**
   * Return request params required for making request to recommendation service
   * Format params and does necessary calculations
   */
  protected abstract getRequestParams(requestParams: RecommendationRequest, authParams: AuthParams): Promise<RequestParams>;

  /**
   * Send request to recommendation service and returns recommendations in service specified format
   * Implements retry mechanism specific for the service (exponential-backoff, compliance with rate limiter)
   */
  protected abstract requestRecommendation(requestParams: RequestParams): Promise<Array<Recommendation>>;

  /**
   * Format recommendations to RecommendationDtos
   */
  protected abstract formatRecommendation(recommendation: Array<Recommendation>): Promise<Array<RecommendationDto>>;
}
