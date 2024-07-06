<div align="center">
  <h3 align="center">Project P - Coding Challenge</h3>

  <p align="center">
    Andries Verbanck
    <br />
    <a href="https://github.com/the-project-b/backend-coding-challenge/tree/main"><strong>Original task description »</strong></a>
  </p>
</div>

## Prerequisites

- NodeJS: >=20.0.0
- Yarn: 1.22.22

## Installation

- `yarn install`

## Checklist & *comments*

- Employee Module:
  - Create Employee Endpoint:
    - [x] Add new employees with basic details like name, job title, and department.
    - [x] Read Employee Endpoint: Retrieve employee details using their ID and list all employees.
    - [x] Update Employee Endpoint: Update an employee's job title and department.
    - [x] Delete Employee Endpoint: Remove an employee from the system.

- Simple Email Service:
  - [ ] Integrate an email service that sends notifications (e.g., welcome email on employee creation).
  - [ ] Use a queue system (like Bull) to manage and trigger email notifications asynchronously.

- Basic Setup and Configurations:
  - [ ] Feel free to use a NestJS boilerplate for initial setup.
  - [x] Set up basic validation for input data and error handling for the CRUD operations.
  - [x] Implement a simple data storage solution (in-memory or a basic database setup).
    - *Kept it to very simple in-memory implementation as there is no mention of persistent data needs*
  - [x] We're using a GraphQL API using Apollo Server, but feel free to decide for yourself if you want to go for a REST or GraphQL based API.
    - *❤️ GraphQL*

## Challenges Faced

- Never worked with NestJS
  - Have worked with MVC design patterns before in Laravel though
  - Was fun to dive into their documentation and resources to learn the framework
    - Did affect the time it took to complete this task
  - Within NodeJS I've mainly worked with OOP & DDD design pattern within a monorepo structure
- GraphQL implementation in NestJS
  - Traditionally I've always just straight up used Express > Apollo > GraphQL so I've had to do some digging, again, a fun experience
  - Field validation, there are docs about doing this with the code-first approach but I choose the schema first approach
    - Although the original challenge only mentioned simple validation, it did also mention error handling so decided to **swap the schema-first approach to code-first approach** as it seems that this implementation give a lot more freedom when it comes to argument validation
    - I struggled a bit on the error messaging, didn't like that it was just throwing "Bad Request Exception" as response and I wanted to explicitly return the validation errors as one would expect

## Improvements to be made

- Better error handling: Especially if we hook into a service like Datadog, we want to spruce up our errors and bind more context to them

## Resources used

- https://docs.nestjs.com/
  - https://docs.nestjs.com/graphql/quick-start
- https://www.youtube.com/watch?v=juNVinepwKA
- https://stackoverflow.com/a/66715831
- https://stackoverflow.com/a/64129469