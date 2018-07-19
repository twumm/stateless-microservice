# Stateless Microservice for Hackerbay

A simple stateless microservice in Nodejs, with three major functionalities -

 * Authentication
 * JSON patching
 * Image Thumbnail Generation

## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

Clone the repo.
```
git clone https://github.com/twumm/stateless-microservice-hackerbay.git
```

Open the repo. Use the same directory name(below) if you do not change it.
```
cd stateless-microservice-hackerbay
```

Setup the application by installing its dependencies with
```
npm install
```

The app gets up and running on port 3000.

## Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

* Authentication
This is a mock authentication so you can pass in any username or password to login.
 1. Set the request to **POST** and the url to **http://localhost:3000/api/users/login**. 
 2. In the **Body** for the Postman request, select **x-www-form-urlencoded**
 3. You will be setting 2 keys (for username and password). Set the ```username``` key to any name. Set ```password``` to any password (minimum of 6 characters).
 4. Hit ```Send```. You will get a result in this format:
 ```
 {
    "user": "moi",
    "authorized": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaSIsImlhdCI6MTUzMjAwNDkwMSwiZXhwIjoxNTMyMDI2NTAxfQ.sonItbpZ_yKsRLDXNfDqwN6yN5VbdMVDhgKAMxDmPFY"
}
 ```

 
