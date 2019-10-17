const con = require('../config/db'); 

module.exports = function(app){
    app.get('/api/get-summary',async (req,res)=>{
        let smsSent,uniqueNum;
        try{
            smsSent = await con.query("select sum(count) as smsSent from otps");
            uniqueNum = await con.query("select count(distinct mobile) as uniqueNum from otps");
            res.send({
                success:true,
                smsSent:smsSent[0].smsSent,
                uniqueNum:uniqueNum[0].uniqueNum
            });
        }
        catch(err){
            console.log(err);
            res.send({
                success:false,
                message:'Some error occured,Please try again later'
            });
        }
    });
}