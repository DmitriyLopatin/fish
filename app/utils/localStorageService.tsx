export class LocalStorageHandler{

    public static getUserToken=()=>{
     const token = localStorage.getItem('.AuthToken')
     return token ?? null // = token ? token : null
    }

    public static setUserToken=(token:string)=>{
        localStorage.setItem('.AuthToken', token)
    }
    public static clearUserToken=()=>{
        localStorage.removeItem('.AuthToken')
    }
}