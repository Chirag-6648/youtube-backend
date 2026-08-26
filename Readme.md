# Learning backend development

Initialize the backend project with "npm init"

[Models Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

Before starting any project
steps :

- create a gitIgnore
- Prettier file
  - .Prettierrc file is used to configure the fornating of code
  - .PrettierIgonre is used to in which file do not use formatting
- install Required Dependancies
- Create Required Folders like
  Controllers
  DB
  Middlwares
  Models
  Routes
  Utils
- Update in the package.json
- add the dev script
- update the Type commongjs to module

# Database connection

- when you create a database connection than always use async await or use promise
- database is always in another continent

# Configure CORS for from which origin the request is coming

- install cors
- you just need to add
  app.use(cors())
- there are some parameters which we can add in the cors like
- app.use(
  cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
  })
  );
- also remember to add use
  app.useI(express.json())
- this is used for read JSON data which is sent by client

# There four parameters in the method of api.get and like others

- error
- request - for request
- response - for response
- next - for middleware

# Created a Common request handler function

asyncHandle.js

# Create a API Error handler that returns error in the proper structure

- it extends the class of javascript Error and overwrites it
- the proper structure of error
  - status code
  - message
  - should pass data always null in the error
  - success flag should be false and passing it as false
  - Important thing errors

# Create a Common API Response handler class

- that returns proper structure of api response
  - status code
  - data
  - message
  - success

# Create Model for User and Video

- creating a modal with fields like
  username
  email
  password
  fullName
  avatar
  coverlmage
  watchHistory
  refreshToken
  createdAt
  updatedAt

- if you want to create any feild searchable in the data base than remembeer to add index in the model creattion it just makes searching optimized

- Added some methods in the user model and video model to generate the access token refresh toeken
  bcrypt the password, compare the passsword

- for password Hash
  userSchema.pre("save", async function (next) {
  if (!this.isModified(password)) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
  });

- for password compare
  userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  };

- for generate access token
  userSchema.generateAccessToken = async function () {
  jwt.sign(
  {
  _id: this._id,
  email: this.email,
  username: this.username,
  fullname: this.fullname,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
  expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  }
  );
  };

- for generate refresh token  
  userSchema.generateRefreshToken = async function () {
  jwt.sign(
  {
  _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  }
  );
  };

- in video model added hook for hook for aggregation
