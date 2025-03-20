const Hero = ()=>{
    const var1 = {
        varBLW :10,
        styling:{
            backgroundColor:'white',
            color:'black',
        }
    }
    return (
    <div className="heroImg" style={var1.styling}>
        {var1.varBLW}
    </div>)
}
export default Hero