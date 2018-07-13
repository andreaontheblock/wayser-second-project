# WAYSER

## Description
"Your service right on the way"

Wayser is an online platform in which potential service providers can create their own profile and publish their service without intermediaries (e.g. french teacher, plumber, baby-sitter...). Users interested in acquiring a specific service can also create a profile, search for the service and contact the provider. If an agreement is reached, the user acquires the service.

## User Stories

List of user stories in order of priority/importance.

Example:
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **search** - As a user I want to enter the page and search for the service I need.
- **sign up** - As a user I want to sign up on the webpage so that I can see the services I could require.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **add service** - As a user I want to add a service I will provide to my profile.
- **service list** - As a user I want to see all the services available so that I can choose the one I want.
- **service detail** - As a user I want to see more information regarding the service I am intrested in.
- **own profile** - As a user I want to see my own information displayed on my profile.
- **filter category** - As a user I want to see the services ordered by categories.
- **filter price** - As a user I want to see services ordered by price.

## Backlog

List of other features outside of the MVPs scope

User profile:
- upload my profile picture
- edit profile
- ratings
- location
-'other' unit for the price
-send email
-add phone number
-add service experience
-user profile page
-add comments
-google maps
-paypal payment


## ROUTES:
```
GET / 

GET /auth/signup
POST auth/signup - POST Body: username, password
GET /auth/login
POST /auth/login - POST Body: username, password
POST auth/logout - POST Body: nothing

GET /services
GET /services?cat=xxx
GET /services?cat=xxx?terms=xxx
GET /services/:id
GET /profile/
GET /profile/create-service

```

## MODELS

```
Service
- name: String
- category: String
- description: String
- owner : UserId
- price: {amount: Number, unit : String}
```    

```
User
- username: String
- password: String
- email: String
```

## Links

### Trello

Board Link:
https://trello.com/b/gjontSRk/wayser

### Git

Repository Link:
https://github.com/andreaontheblock/wayser-second-project/new/master?readme=1

Deploy Link:
[Deploy Link](http://heroku.com)

### Slides.com

Presentation Slides Link:
[Slides Link](http://slides.com)
