import DefaultPageLayout from "../components/Layout/DefaultPageLayout";
import RegisterUserForm from "../components/forms/user/RegisterUserForm";
import LoginUserForm from "../components/forms/user/LoginUserForm";

interface Props {
    isSignUp: Boolean;
}

const AuthScreen = ({ isSignUp }: Props) => {
    return <DefaultPageLayout>{isSignUp ? <RegisterUserForm /> : <LoginUserForm />}</DefaultPageLayout>;
};

export default AuthScreen;
