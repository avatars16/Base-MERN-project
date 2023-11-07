import { useAppDispatch, useAppSelector } from "../../services/REDUX/hooks/reduxHooks";
import { useLogoutMutation } from "../../services/REDUX/slices/usersApiSlice";
import { logout } from "../../services/REDUX/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Psychology, AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import DarkModeToggle from "../shared/DarkModeToggle";
import TranslateText from "../shared/TranslateText";
import LocaleToggle from "../shared/LocaleToggle";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            googleLogout();
            navigate("/login");
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Psychology />
                    <Box sx={{ pl: 1, flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to={"/"}
                            sx={{ textDecoration: "none", color: "inherit" }}>
                            <TranslateText tKey="header.title" />
                        </Typography>
                    </Box>
                    <LocaleToggle />
                    <DarkModeToggle />
                    {userInfo ? (
                        <>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {/* Using material-ui-popup-state, demo on https://mui.com/material-ui/react-menu/ */}
                                {(popupState) => (
                                    <>
                                        <Button color={"inherit"} {...bindTrigger(popupState)}>
                                            <TranslateText tKey="header.hiUser" params={{ userName: userInfo.name }} />
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem component={Link} to="/profile">
                                                <ListItemIcon>
                                                    <AccountCircle />
                                                </ListItemIcon>
                                                <TranslateText tKey="header.profile" />
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={logoutHandler}>
                                                <TranslateText tKey="header.logout" />
                                            </MenuItem>

                                            {/* <MenuItem onClick={popupState.close}>Close</MenuItem> */}
                                        </Menu>
                                    </>
                                )}
                            </PopupState>
                        </>
                    ) : (
                        <Button component={Link} to="/login" color="inherit">
                            <TranslateText tKey="authPage.login" />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
