# Sodimac

## System Requirements
- node 14
- npm 8


## Name Function 
- sodimacapi


## Getting Started

Install dependencies
```bash
npm install
```

Run the application
```bash
func host start
```

## Endpoint to test 
```
https://sodimactest.azurewebsites.net/api/sodimacapi
```
```JSON
GET
[
  {
    "id": string,
    "sku": string,
    "name": string,
    "stock": number,
    "weight": number
  }
]
```
```JSON
POST
{
   "sku": string,
   "name": string,
   "stock": number,
   "weight": number
}
```
```JSON
PUT
{
   "id": string,
   "sku": string,
   "name": string,
   "stock": number,
   "weight": number
}
```
```
DELETE
https://sodimactest.azurewebsites.net/api/sodimacapi?id=<id>&partitionKey=<sku>
```
