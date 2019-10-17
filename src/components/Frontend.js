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
            <div className = "container-fluid pt-5" style = {{height:'100vh',width:'100vw',background: '-webkit-linear-gradient(to bottom, #654ea3, #eaafc8)',background: 'linear-gradient(to bottom, #654ea3, #eaafc8)'}}>
                <div className = "row no-gutters justify-content-center align-items-center" style = {{backgroundColor:'#'}}>
                    <div className = "col-12 text-center">
                        <h1 className = "d-none d-lg-block text-white" style = {{fontFamily:["Georgia","sans-serif"],fontSize:'500%'}}>
                            Welcome to otp validation service
                        </h1>
                        <h5 className = "d-block d-lg-none text-white" style = {{fontFamily:"Georgia"}}>
                            Welcome to otp validation service
                        </h5>
                    </div>
                </div>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 col-lg-4 text-center">
                        <div className = "mt-3 text-center">
                            <form onSubmit = {this.sendOtp}>
                                <div className = "form-group">
                                    <label className = "text-white" style = {{fontFamily:"Lucida Grande"}}> <small>Enter your 10 digit mobile number below to continue </small></label>
                                    <input 
                                        type = "mobile" 
                                        className = "p-2 rounded form-control text-center" 
                                        id = "mobile" 
                                        onChange = {this.handleChange} 
                                        value = {mobile} 
                                        style = {{border:'o.8px solid #88a09e'}}
                                    />
                                    {
                                        (error)?
                                        <div style = {{color:'#9b1d29'}}><small>{error}</small></div>
                                        :
                                        null
                                    }
                                </div>
                                <button className = "btn btn-outline-dark"> Send Otp </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frontend;