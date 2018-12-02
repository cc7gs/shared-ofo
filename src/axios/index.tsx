import Jsonp from 'jsonp'

const Axios={
    jsonp(options:any){
        return new Promise((resolve:any,reject:any)=>{
            Jsonp(options.url,{
                param:'callback'
            },(error:any,response:any)=>{
                if(response.status=='success'){
                    resolve(response);
                }else{
                    reject(error.message);
                }
            })
        })
    }
}
export default Axios;