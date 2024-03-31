
import { Request, Response } from "express";
import AWS from "aws-sdk";
import SNS, { PublishInput } from "aws-sdk/clients/sns";
import { responseData } from "../util";
AWS.config.update({ region: process.env.AWS_REGION });
AWS.config.accessKeyId=process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY;


const otpData = { code: "" } as {code :string}; 

export const requestOtp = (req: Request, res: Response) => {
    const sns = new SNS({ region: process.env.AWS_REGION });
    const otp=Math.floor(Math.random()*10000).toString(); 
    const params: PublishInput = {
        Message: `otp is ${otp}`,
        TopicArn:process.env.AWS_TOPIC_ARN
    };
    otpData.code=otp;
    sns.publish(params).promise()
        .then(data => {
            console.log(`Message ${params.Message} sent to the phone number ${params.PhoneNumber}`);
            console.log("MessageID is " + data.MessageId);
            responseData(res,200,"otp send successfully",null)
        })
        .catch(err => {
            console.error(err, err.stack);
            responseData(res,500,"Failed to send OTP",null)
        });
};

export const verifyOtp = (req: Request, res: Response) => {
    const {otp}=req.body;
    if(otpData.code===otp){
        responseData(res,200,"otp verification successful",null)
    }else{
        responseData(res,400,"incorrect otp",null)
    }
};
