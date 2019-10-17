const con = require('../config/db'); 

module.exports = function(app){
    app.post('/api/verify-otp',async (req,res)=>{
        const token = req.body.token.trim();
        const otp = req.body.otp.trim();

        if(!token){
            return res.send({
                success:false,
                message:'Something went wrong try again later'
            });
        }
        else if(!otp){
            return res.send({
                success:false,
                message:"OTP cannot be blank"
            });
        }
        else if(isNaN(otp)){
            return res.send({
                success:false,
                message:"Invalid OTP"
            });
        }

        try{
            let otps = await con.query(`Select * from otps where token = '${token}' and otp = ${otp} and date_added >= NOW() - INTERVAL 5 MINUTE`);

            if(otps.length > 0){        //checking if otp already exists
            return res.send({
                success:true,
                message:'OTP verified'
            })
            }else{
                return res.send({
                    success:false,
                    message:'Invalid OTP'
                });
            }
        }
        catch(err){
            console.log(err);
            return res.send({
                success:false,
                message:'Some Error Occured,Please try again later'
            });
        }
    });
}