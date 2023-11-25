import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { snackbarContext } from "../services/providers/Snackbar.provider";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

const GoogleAuth = () => {
    var clientId: string = "286829291882-d5m5frt1qd9m16pjv0lho10aii043bin.apps.googleusercontent.com";
    const navigate = useNavigate();
    const { setSnackbarContext } = useContext(snackbarContext);

    const { loginGoogleAuth } = useAuth();

    const handleSumbit = async (response: CredentialResponse) => {
        try {
            const res = await loginGoogleAuth.mutateAsync(response);
            if (res) {
                navigate("/");
            }
        } catch (err: any) {
            if (err?.success) return;
            setSnackbarContext(err?.error?.message);
        }
    };

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleSumbit}
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
