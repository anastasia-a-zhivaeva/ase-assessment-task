import axios, { AxiosResponse } from "axios";

import { RecommendationDto, RecommendationRequest } from "../models";
import { RecommendationServiceTemplate } from "./recommendation-service.template";

interface Service1ServiceInfo {
  url: string;
  token: string;
}

interface Service1AuthParams {
  token: string;
}

interface Service1Recommendation {
  confidence: number;
  recommendation: string;
}

interface Service1Request {
  weight: number;
  height: number;
  token: string;
}

interface Service1Success {
  statusCode: number;
  body: string;
}

interface Service1Error {
  errorCode: number;
  errorMessage: string;
  statusCode: number;
}

type Service1Response = Service1Success | Service1Error;

/**
 * Concrete implementation of RecommendationService1
 */
export class RecommendationService1 extends RecommendationServiceTemplate<Service1ServiceInfo, Service1Request, Service1AuthParams, Service1Recommendation> {
 
  protected override async getAuthenticationParams(): Promise<Service1AuthParams> {
    return { token: this.serviceInfo.token };
  }

  protected override async getRequestParams(requestParams: RecommendationRequest, authParams: Service1AuthParams): Promise<Service1Request> {
    return {
      weight: requestParams.weight,
      height: requestParams.height,
      ...authParams,
    }
  }

  protected override async requestRecommendation(requestParams: Service1Request, retriesLeft = 3): Promise<Array<Service1Recommendation>> {
    console.log(requestParams);

    const { data } = await axios.post<Service1Response, AxiosResponse<Service1Response>, Service1Request>(this.serviceInfo.url, requestParams);
    
    console.log(data);
    if (this.isSuccessfulResponse(data)) {
      return JSON.parse(data.body);
    }

    return this.requestRecommendation(requestParams, retriesLeft - 1);
  }

  protected override async formatRecommendation(recommendations: Array<Service1Recommendation>): Promise<Array<RecommendationDto>> {
    return recommendations.map(recommendation => ({
      priority: recommendation.confidence * 1000,
      title: recommendation.recommendation
    }));
  }

  private isSuccessfulResponse(response: Service1Response): response is Service1Success {
    return response.statusCode === 200
  }
}
