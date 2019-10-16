const Msg91 = require('msg91-promise');
const msg91key = require('../config/env').msg91Key;
const suid = require('rand-token').suid;
const con = require('../config/db'); 

module.exports = function(app){
    app.post('/api/send-otp',async (req,res)=>{
        let mobile = req.body.mobile.trim();
        if(mobile && mobile.length == 10){
            mobile = "91"+mobile;
        }
        else{
            res.send({
                success:false,
                message:'Invalid mobile number'
            });
        }
        
        const token = suid(8);
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000); //generating a 6 digit otp
        message = `OTP is ${otp}`;
        sender = encodeURI('DALCHI');

        const msg91 = Msg91(msg91key, sender, 4); //4 is the transactional route code

        //message details
        let numbers = mobile;

        msg91.send(numbers, message)
            .then(async (response) => {
                try{
                    await con.query(`insert into otps(otp,token,response,count) values(${otp},'${token}','${response}',1)`);
                    return res.send({
                        success: true,
                        token: token
                    });
                }
                catch(err){
                    return res.send({
                        success: false,
                        message:'Some error occured, Please try again later'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.send({
                    success:false,
                    message:err
                });
            });
    });
}