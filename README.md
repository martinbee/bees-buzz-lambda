# bees-buzz-lambda

AWS lambda used to fetch articles for Bees Buzz News Hub

## Plan

- Use Cloudwatch events to trigger this cron job every morning
- Use AWS for secrets but fallback to a .env so I can test locally
- Get data from apis/scrape and then data marshall
- Log data
- Eventually store in AWS DB (which one?)
