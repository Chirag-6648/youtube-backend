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

# File Uploading

- in this porject we are using cloudinary for image upload
- first User will uplaod file using multer, cloudinary is just used to upload the file on the cloud

- first we will do the Cloudinary setup

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.API_KEY,
api_secret: process.env.API_SECRET,
});

const uplaodOnCloudinary = async (localFilePath) => {
try {
if (!localFilePath) return null;
// Upload the file on Cloudinary
const response = cloudinary.uploader.upload(localFilePath, {
resource_type: "auto",
});
// file has been uploaded successfully
console.log("File Is Uplaoded on Cloudinary", (await response).url);
return response;
} catch (error) {
console.log("Error while uplaoding file", error);
fs.unlinkSync(localFilePath); // removes the locally saved temp file as the upload operation got failed
return null;
}
};

export { uplaodOnCloudinary };

- then Multer setup

import multer from "multer";

const crypto = require("crypto");

const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "./public/temp");
},
filename: function (req, file, cb) {
crypto.randomUUID((err, raw) => {
if (err) return cb(err);
cb(null, `${file.originalname}-${raw}`);
});
},
});

export const upload = multer({ storage });

# HTTP && HTTPS

- mostly both are same just diffrence is the data is passing is encrypted in the https and in the https its clear text
- http stand for hyper text transfer protocol
- what is http headers ?
  meta data => key value which is sent with the request and response
- caching, authentication, manage state
  x-prefix ->2012 (x-deprecated)

  - request header -> from client
  - response header -> from server
  - representation headers -> encoding / compression
  - payload headers -> data

Most Common headers

- Accept : application / json
- User - Agent
- Authorization
- content-type
- cookie
- cache-control

Cors

- Access-Control-Allow-origin
- Access-Control-Allow-Credential
- Access-Control-Allow-Method

Security

- Cross-Origin-Embedder-Policy
- Corss-Orgin-Opener-Policy
- Context-Security-Policy
- X-Xss-Protection

# HTTP Methods

- Basic Set of the operation which is used to interact with server

- Get -> Retrieve a Response
- Head -> No message Body (Response Header only)
- Options -> what operation are availble
- Trace -> Loopback test (get same data)
- Delete -> to remove a resource
- Put -> replace a resource
- Post -> interact with resource (mostly to add)
- Patch -> to change past of resource
