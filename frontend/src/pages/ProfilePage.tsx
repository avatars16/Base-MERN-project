import DefaultPageLayout from "../components/Layout/DefaultPageLayout";
import UpdateUserForm from "../components/forms/user/UpdateUserForm";

const ProfileScreen = () => {
    return (
        <DefaultPageLayout>
            <UpdateUserForm />
        </DefaultPageLayout>
    );
};

export default ProfileScreen;
