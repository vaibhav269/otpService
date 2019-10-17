const Msg91 = require('msg91-promise');
const msg91key = require('../config/env').msg91Key;
const suid = require('rand-token').suid;
const con = require('../config/db'); 

module.exports = function(app){
    app.post('/api/send-otp',async (req,res)=>{
        let mobile = req.body.mobile.trim();
        let sender = encodeURI('DALCHI');
        let message = '';

        const msg91 = Msg91(msg91key, sender, 4); //4 is the transactional route code

        if(mobile && mobile.length == 10){
            mobile = "91"+mobile;
        }
        else{
            return res.send({
                success:false,
                message:'Invalid mobile number'
            });
        }
        let otps = await con.query(`Select * from otps where mobile = ${mobile} and date_added >= NOW() - INTERVAL 5 MINUTE`);

        if(otps.length > 0){        //checking if otp already exists
            if(otps[0].count >= 5 ){    //checking for the count of otp requests within 5 minutes
                return res.send({
                    success:false,
                    message:'Sorry you can request otp only for five times in 5 minutes. Try again later'
                });
            }else{
                const opt = otps[0].otp;
                message = `OTP is ${opt}`;
                msg91.send(mobile, message)
                    .then(async (response) => {
                        try{
                            await con.query(`update otps set count = ${otps[0].count+1},response = CONCAT(response,',${response}') where id = ${otps[0].id}`);  //sending previous otp and increasing count
                            return res.send({
                                success:true,
                                token:otps[0].token
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
                        return res.send({
                            success:false,
                            message:'Some error occured, Please try again later'
                        });
                    });
            }
        }else{
            //message details
            const token = suid(8);
            const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000); //generating a 6 digit otp
            message = `OTP is ${otp}`;
            let numbers = mobile;

            msg91.send(numbers, message)
                .then(async (response) => {
                    try{
                        await con.query(`insert into otps(mobile,otp,token,response,count) values('${mobile}',${otp},'${token}','${response}',1)`);
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
                    return res.send({
                        success:false,
                        message:'Some error occured, Please try again later'
                    });
                });
        }    
    });
}