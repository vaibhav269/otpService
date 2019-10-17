const con = require('../config/db'); 

module.exports = function(app){
    app.get('/api/get-details',async (req,res)=>{
        let details;
        try{
            details = await con.query("select mobile,sum(count) as count from otps group by mobile");
            res.send({
                success:true,
                details:details
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