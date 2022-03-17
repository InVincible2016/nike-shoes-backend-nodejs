### Nike Interview Backend Code Challenge [NodeJS]

_The provided code document should contain more details._

Start server (Port 8081): `npm install -> npm start`

APIs:

1. Get original price (randomly fetched) for a supplied shoe id:
```
URL (GET) - http://localhost:8081/api/shoe-price/1

Response:
{
    "shoePrice": 147
}
```
2. Get original and discount price (randomly fetched) for a supplied shoe id:
```
URL (GET) - http://localhost:8081/api/shoe-discount-price/1

Response:
{
    "shoePrice": 147,
    "discountPrice": 88.2
}
```
## How did you prioritize tasks?
- I finished the tasks in the following order: 2 -> 1 -> 3.
- The modification to the endpoint comes first because it's a functional change, and I usually put functional change first before proceeding to writing tests. I know there are people work their way differently like test driven development. It's just my preference to code first then test.
- The CI part comes the last, because it matches what happens in everyday development. Implementation and tests are finished first in local before pushing for pull request.
## Description of your changes & code improvements.
- I created a new endpoint to handle requests for discount price. I assume that the discount price is not available to normal users and may require additional user role, so putting it under a separate endpoint would be easier to add additional checks and prevent changing exisitng endpoint behaviors.
- In the applyDiscount function, I didn't do it with 'price * 0.6' directly because that would cause JS floating point number precision problem, (if you do 9 * 0.6 would get 5.399999999995 instead of 5.4).
- I added tests the two endpoints using supertest. The tests include check for the response, status code and how they handle ids with special characters.
- I saw that the serve has CORS enabled, so I assume it will be available to browser requests from other domains, and I added the test for it.
- an alpha.yml file is added to the project. It triggers the GitHub Actions runner. It runs on the latest Ubuntu available to the agent with Node 16. Note that it only runs npm test.
## If you had more time, what would you add further.
- I would have added another SSE endpoint to feed price info actively to subscribed clients.(see frontend README for reasons)
- I think all APIs whether or not it is public available should have some sort of authorization/authentication, session based, JWT, api token, etc... to prevent spams and unauthorized usage.
- Maybe another endpoint to bulk load price info, but it really depends on the use case for the applicaton. It would make sense to have an endpoint that take a list of shoe ids and return them all in one request rather than having the frontend to fire a request for each shoes. This would reduce network overhead but then probably need some pagination if the request and response get too large. 
## What were your doubts, and what were your assumptions for the projects?
- This service is pretty much a proxy to another service hosted on AWS, not sure if it's because it's an interview question. Because of this, there is not much need to test how the our endpoint controller handles request. so I only tested the response payload and CORS.

