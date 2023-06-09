# Employee Review System
This application has following features 
1. Admin view
```sh
Add/remove/update/view employees
Add/update/view performance reviews
Assign employees to participate in another employee's performance review
```
2. Employee view
```sh
List of performance review requiring feedback 
An employee can register, only admin can make an employee an admin
```
3. sign in for admin and user.
```sh
also has super user for initialting the application once
Make 1 login for admin and employee
```

## How to setup on local machine
1. To use this repository your machine should have [node](https://nodejs.org/en/), npm, [monogodb](https://docs.mongodb.com/manual/installation/) and [git](https://git-scm.com/downloads). to check version exicute these.
```go
node --version
npm --version
git --version
```
2. Now clone this repository
```go
git clone https://github.com/AkashKoley012/Employee-Management-System.git
```
3. Change directory to Employee-Management-System
```go
cd Employee-Management-System
```

3. Install dependencies
```go
npm install 
```
4. That's... it  run the application
```go
npm start
```
## File structure
here you are looking at directory structure with root level files only.
```sh
Employee-Review-System
├── assets
│   ├── images
│   ├── js
├── node-modules
├── config
├── controllers
├── index.js
├── models
├── package-lock.json
├── package.json
├── readme.md
├── routers
└── views
    └── partials
```

