import React,{Component} from 'react';

class Frontend extends Component{
    constructor(props){
        super(props);
        this.state = {
            mobile:'',
            token:undefined,
            error:false  
        }
        this.sendOtp = this.sendOtp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        if(!isNaN(e.target.value)){
            this.setState({
                mobile:e.target.value,
                token:undefined
            });
        }
    }

    sendOtp(e){
        e.preventDefault();
        var jsonObject = {
            mobile:this.state.mobile
        };
        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }

        fetch('/api/send-otp',options)
        .then( (res) => {
             return res.json();
        })
        .then((json)=>{
            console.log(json);
            if(json.success){
                this.setState({
                    error:false,
                    token:json.token
                });
            }else{
                this.setState({
                    error:json.message
                });
            }
        });
    }
    
    render(){
        let {mobile,error} = this.state;
        return(
            <div className = "container-fluid pt-5" style = {{backgroundColor:'#F5F5F5',height:'100vh',width:'100vw'}}>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 text-center">
                        <h1 className = "display-4" style = {{color:'#93827f'}}>Please Enter the mobile number Below</h1>
                    </div>
                </div>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 col-lg-4 text-center">
                        <div className = "mt-3 text-center">
                            <form onSubmit = {this.sendOtp}>
                                <div className = "form-group">
                                    <input 
                                        type = "mobile" 
                                        className = "text-white border-0 p-2 rounded form-control text-center" 
                                        id = "mobile" 
                                        onChange = {this.handleChange} 
                                        value = {mobile} 
                                        style = {{backgroundColor:'#88a09e'}}
                                    />
                                    {
                                        (error)?
                                        <div className = "text-danger"><small>{error}</small></div>
                                        :
                                        <div className = "text-muted"><small>Number should be of 10 digits</small></div>
                                    }
                                </div>
                                <button className = "btn btn-outline-secondary"> Send Otp </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frontend;