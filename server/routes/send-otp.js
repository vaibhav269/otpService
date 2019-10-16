var Msg91 = require('msg91-promise');
const msg91key = require('../config/env').msg91Key;
var suid = require('rand-token').suid;

module.exports = function(app){
    app.post('/api/send-otp',(req,res)=>{
        console.log(req.body);
        const {mobile} = req.body;
        const token = suid(16);
        sender = encodeURI('DALCHI');

        const msg91 = Msg91(msg91key, sender, 4); //4 is the transactional route code

        //message details
        let numbers = mobile;

        return msg91.send(numbers, message)
            .then(response => {
                return {
                    success: true,
                    response: response
                }
            })
            .catch(err => {
                console.log(err);
                throw new Error("Error:Message not sent");
            });
    });
}