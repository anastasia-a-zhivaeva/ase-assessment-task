import axios, { AxiosResponse } from "axios";
import { randomUUID } from "crypto";

import { RecommendationDto, RecommendationRequest } from "../models";
import { RecommendationServiceTemplate } from "./recommendation-service.template";

interface Service2ServiceInfo {
  url: string;
}

interface Service2AuthParams {
  session_token: string;
}

interface Service2Recommendation {
  priority: number;
  title: string;
  details: string;
}

interface Service2Request {
  measurements: {
    height: number;
    mass: number;
  }
  birth_date: number;
  session_token: string;
}

interface Service2Response {
  statusCode: number;
  body: string;
}

/**
 * Concrete implementation of RecommendationService2
 */
export class RecommendationService2 extends RecommendationServiceTemplate<Service2ServiceInfo, Service2Request, Service2AuthParams, Service2Recommendation> {
 
  protected override async getAuthenticationParams(): Promise<Service2AuthParams> {
    return { session_token: randomUUID() };
  }

  protected override async getRequestParams(requestParams: RecommendationRequest, authParams: Service2AuthParams): Promise<Service2Request> {
    return {
      measurements: {
        height: +(requestParams.height / 30.48).toFixed(2),
        mass: +(requestParams.weight * 2.2).toFixed(1),
      },
      birth_date: new Date(requestParams.dateOfBirth).getTime(),
      ...authParams,
    }
  }

  protected override async requestRecommendation(requestParams: Service2Request, retriesLeft = 3): Promise<Array<Service2Recommendation>> {
    console.log(requestParams);

    const { data } = await axios.post<Service2Response, AxiosResponse<Service2Response>, Service2Request>(this.serviceInfo.url, requestParams);
    
    console.log(data);
    if (this.isSuccessfulResponse(data)) {
      return JSON.parse(data.body);
    }

    return this.requestRecommendation(requestParams, retriesLeft - 1);
  }

  protected override async formatRecommendation(recommendations: Array<Service2Recommendation>): Promise<Array<RecommendationDto>> {
    return recommendations.map(recommendation => ({
      priority: recommendation.priority,
      title: recommendation.title,
      description: recommendation.details,
    }));
  }

  private isSuccessfulResponse(response: Service2Response): boolean {
    return response.statusCode === 200;
  }
}
