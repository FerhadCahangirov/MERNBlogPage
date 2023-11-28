import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from './Routers/postsRouter.js';
import authRouter from './Routers/authRouter.js';
import usersRouter from './Routers/usersRouter.js';
import categoriesRouter from './Routers/categoriesRouter.js';
import servicesRouter from './Routers/servicesRouter.js';
import tagsRouter from './Routers/tagsRouter.js';

import bodyParser from "body-parser";

dotenv.config();

const app = express();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGOOSE)
        console.log("Connected to db");
    }catch(err){
        console.log(err);
    }
};

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

app.use('/posts', postRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/services', servicesRouter);
app.use('/tags', tagsRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

app.listen(process.env.PORT || 3000, () => {
    connect();
    console.log(`Server is running at port ${process.env.PORT || 3000}`);
});
