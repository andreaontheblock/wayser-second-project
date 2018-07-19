# WAYSER

## Description
"Service right on your way"

Wayser is an online platform to provide an acquire services without intermediaries. Potential service providers can create their own profile and publish their service (e.g. french teacher, plumber, baby-sitter...). Users interested in acquiring a  service can also create a profile, search for the service and contact the provider through the app. If an agreement is reached, the user acquires the service.

## User Stories

List of user stories in order of priority/importance.

Example:
- **404** - As a user I want to see a nice 404 error page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice 500 error page when the super team screws it up so that I know that is not my fault.
- **search** - As a user I want to search for the service I need.
- **service list** - As a user I want to see all the services available on the app.
- **sign up** - As a user I want to sign up on the app so that I can see the services I could require and maybe provide my own service.
- **login** - As a user I want to be able to log in so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the app so that I can make sure no one will access my account.
- **add service** - As a user I want to add a service I will provide to my profile.
- **service detail** - As a user I want to see more information regarding the service I am intrested in.
- **own profile** - As a user I want to see my own information displayed on my profile.
- **filter category** - As a user I want to see the services sorted by categories.
- **filter name** - As a user I want to be able to sort the services by ascending and descending name.
- **filter price** - As a user I want to be able to sort the services by ascending and descending price.
- **contact service provider** - As a user I want to contact the service provider of the service I am interested in.
- **upload profile picture** - As a user I want to upload a picture to my profile.


## Backlog

List of other features outside of the MVPs scope

User profile:
- upload profile picture
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

GET  /auth/signup
POST /auth/signup - POST Body: username, password
GET  /auth/login
POST /auth/login - POST Body: username, password
POST /auth/logout - POST Body: nothing

GET /services
GET /services?cat=xxx
GET /services?cat=xxx?terms=xxx
GET /services/:serviceId
GET /services/:serviceId/contact

GET  /profile/
GET  /profile/create-service
POST /profile/create-service
GET  /profile/edit/:serviceId
GET  /profile/edit-service/:serviceId
POST /profile/upload

POST /send-email/:serviceId

GET /api/services/:serviceId

```

## MODELS

```
Service
- name: {type: String, required: true},
- category: {type: String, enum: ['Education', 'Technology', 'Transportation', 'Social Services', 'Maintenance', 'Business', 'Tourism', 'Others'], required: true},
- provider: {type: ObjectId, ref: 'User'},
- price: {
    amount: {type: Number, required: true},
    unit: {
      type: String,
      enum: ['hour', 'day', 'week', 'month', 'year', 'lesson'],
      required: true
    }
  },
- description: {type: String}
```    

```
User
- username: {type: String, unique: true, required: true},
- password: {type: String, required: true},
- email: {type: String, unique: true, required: true},
- location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
- imgUrl: String
```


## Links

### Trello

Board Link:
https://trello.com/b/gjontSRk/wayser

### Git

Repository Link:
https://github.com/andreaontheblock/wayser-second-project/new/master?readme=1

Deploy Link:
https://wayser.herokuapp.com/

### Slides.com

Presentation Slides Link:
https://slides.com/andreaontheblock/wayser#/
