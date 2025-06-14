import {useNavigate} from "react-router";
import {useEffectOnce} from "react-use";

export default function RedirectLogin() {
    const navigate = useNavigate();

    useEffectOnce(() => {
        navigate("/login");
    })

    return <>
    </>
}