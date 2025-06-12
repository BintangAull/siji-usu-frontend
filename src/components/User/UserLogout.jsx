import {useEffectOnce, useLocalStorage} from "react-use";
import checkAndRefreshToken from "../../lib/CheckToken.js";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useNavigate} from "react-router";
import {userLogout} from "../../lib/api/UserApi.jsx";





export default function UserLogout() {

    const [token, setToken] = useLocalStorage('access_token', '');
    const [refresh_token, setRefresh_token] = useLocalStorage('refresh_token', '');
    const navigate = useNavigate();


    async function handleLogout() {
        //cek refresh token bro
        const tokenStatus = await checkAndRefreshToken(token, refresh_token);
        // refresh token nya basi
        //login ulang
        if(tokenStatus.needsLogin){
            await alertError("Token expired, please login again");
            console.log(tokenStatus);
            navigate({
                pathname: "/login",
            })
            return;
        }
        // Kalo si acces token nya basi
        if (tokenStatus.isValid){
            //kita arahin supaya ganti token
            if (tokenStatus.token !== token){
                setToken(tokenStatus.token);
            }
        }

        //barulah kita otak atik disini
        const response = await userLogout(token, {refresh_token});
        if(response.status === 204){
            await alertSuccess("Logout berhasil");
            setToken('');
            setRefresh_token('');
            navigate({
                pathname: "/login",
            })

        }else{
            await alertError("something went wrong, please try again");
        }

    }


    useEffectOnce(() => {
        handleLogout()
            .then(()=> console.log("sukses"))

    })

    return <>

    </>
}