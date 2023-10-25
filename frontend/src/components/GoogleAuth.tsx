import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthGoogleMutation } from "../services/REDUX/slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../services/REDUX/slices/authSlice";
import { useAppDispatch } from "../services/REDUX/hooks/reduxHooks";

const GoogleAuth = () => {
    var clientId: string = "286829291882-d5m5frt1qd9m16pjv0lho10aii043bin.apps.googleusercontent.com";

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [googleAuth] = useAuthGoogleMutation();
    const handleOnSucces = async (credentialResponse: CredentialResponse) => {
        try {
            const res = await googleAuth({ ...credentialResponse }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (err: any) {
            console.log(err?.data?.message || err.error);
        }
    };
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleOnSucces}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                    useOneTap
                    auto_select></GoogleLogin>
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleAuth;
