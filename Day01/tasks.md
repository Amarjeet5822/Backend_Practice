API - Application Programming Interface
- User can access BE data through FE
- Set of rules that allows clients to request data from backend 
- URL from where we get the other app data 
- we fetch data through api
- 2 application can communicate through api

API 
- Application means => FrontEnd, Backend, Anything[3rd Party]
 - Bunch of codes running
- Programming means => Set of Instructions
- Interface means => 

REST API
- CRUD 
Different types of API
GraphQL
g-RPC
SOAP

// function to add Numbers
function addNumbers(a, b) {
  return a+b;
}
Waiter Working as API => Becuase it is work between user and backend[Kictchen] , Serve data or food

Games
  - Computer Games => Key Bindings eg -> Spacebar = Jump ?

- Actions are defined ???
- Jump
- Movement 
- Kick
- Punch

----------------------------------

Client 
 - The Application making a request

FE -> BE
BE -> BE
FE -> DB
BE -> FE[ Rare]

------------------------------------

Server

- The application which is always responding to the request

req, res => Client Server contract 

------------------------------------------------

Task - Login Page

username
password

FE 
POST /  /app/login
{
  username:"",
  password: ""
}

BE 
username validate
password validate
token generate as res

/POST /v1/login
{
  data: {
    username:"",
    password:""
  }
}

Validate => 413
>400 is considered as an Error

BE 
req - GET /v1/user/:id
res - Success: 200
      Invalid ID : 401
      Unauthorized : 403
      Internal Server Error : 500

POST /v1/user

----------------------------------------------------------
Node.js

JS is single threaded. 
[Thread] => One work at a time.

- Async 
  1. Means => Can parallely execute multiple task? 
  2. Can it deligate task to someone else?

  Main Thread
  | 
  |- Child Thread 1
  |- child Thread 2

Non Blocking

Thread 1 [0.5s]
Thread 2 [0.2s] -first give result

Main 
|- child thread

Child Thread spawns from main thread, take the task,
and return to main thread.

[CPU] - [Core] - [Threads] 
Multiple threading. JS is more suitable for multiple threading.
Multiple process => When there is multi CPU used. 
  async await
  .then().catch()

--------------------------------------------------------------
Event Driven [Architecture]

Every task is an event which triggers the next task.
function getUsername()
function getPassword()

function validateUsername()
function validatePassword()

function isAuthenticated()

function generateToken()

-----------------------------------------------------------------
Salting/ Masking
Name = Masai
salted_name = M%@$a%@$s%@$a%@$i  saltedValue = 4

Encryption / Decryption
Name = Masai
Encryption_tag = +1
EncrytedName = Nbtbj

encryption_tag is required for Decryption

Salting/ Masking && Encryption/Decryption both are reversible.

Hashing
It is not reversible.

- One way Hashing 
Name = Masai
HashedName = sdkgori545rgd
name = Masai
hashedName = sdkgori545rgd // First and second hashed value will we compared to check equality.
