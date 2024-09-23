import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let buildUrlEmail = (barberId,token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&barberId=${barberId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.barberId || !data.timeType || !data.date || !data.fullName
          || !data.selectedGender || !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token =  uuidv4();
        await emailService.sendSimpleEmail({
          receiveEmail: data.email,
          customerName: data.fullName,
          time: data.timeString,
          barberName: data.barberName,
          language: data.language,
          redirectLink: buildUrlEmail(data.barberId, token),
        });

        // upsert customer information<update/insert>
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName:data.fullName,
          },
        });
        
        // create booking record / add a new appointment for examination
        if (user && user[0]) {
          await db.BooKing.findOrCreate({
            where: {customerId: user[0].id},
            defaults: {
              statusId: "S1",
              barberId: data.barberId,
              customerId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
            
          });

          //await db.BooKing.customFindOrCreate(user, data, token);
        }

        resolve({
          errCode: 0,
          errMessage: "save infor customer success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async(resolve, reject) => {
     try {
       if (!data.token || !data.barberId) {
            resolve({
              errCode: 1,
              errMessage: "Missing token or barberId",
            });
       } else {
         let appointment = await db.BooKing.findOne({
           where: {
             barberId: data.barberId,
             token: data.token,
             statusId: 'S1'
           },
           raw:false
         })
         if (appointment) {
           appointment.statusId = "S2";
           await appointment.save();
           resolve({
             errCode: 0,
             errMessage:'update appointment success !'
           })
         } else{
            resolve({
              errCode: 2,
              errMessage: "The Schedule has been actived or doesn not exist",
            });
         }
       }
     } catch (e) {
       reject(e);
     }
  })
}



module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
