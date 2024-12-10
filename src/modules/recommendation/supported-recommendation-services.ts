/**
 * In real implementation, they should be in the database
 * But for simplicity, I store them in file
 */
export const supportedRecommendationServices: { name: string, [param: string]: any }[] = [{
  name: "service1",
  url: "https://a2da22tugdqsame4ckd3oohkmu0tnbne.lambda-url.eu-central-1.on.aws/services/service1",
  token: "service1-dev", // imitates permanent API Key that is stored in DB (encrypted)
}, {
  name: "service2",
  url: "https://a2da22tugdqsame4ckd3oohkmu0tnbne.lambda-url.eu-central-1.on.aws/services/service2"
}];
