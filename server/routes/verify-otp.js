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
        let otps = await con.query(`Select * from otps where token = ${token} and date_added >= NOW() - INTERVAL 5 MINUTE`);

        if(otps.length > 0){        //checking if otp already exists
           
        } 
    });
}