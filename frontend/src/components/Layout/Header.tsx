import { Link, useNavigate } from "react-router-dom";
import { Psychology, AccountCircle } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { googleLogout } from "@react-oauth/google";
import DarkModeToggle from "../shared/DarkModeToggle";
import TranslateText from "../shared/TranslateText";
import LocaleToggle from "../shared/LocaleToggle";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import useAuth from "../../hooks/useAuth";
import { snackbarContext } from "../../services/providers/Snackbar.provider";
import { useContext, useEffect } from "react";

const Header = () => {
    const { userInfo, logoutUser } = useAuth();
    useEffect(() => {}, [userInfo]); //Forces rerender after login/logout
    const navigate = useNavigate();
    const { setSnackbarContext } = useContext(snackbarContext);

    const logoutHandler = async () => {
        try {
            await logoutUser.mutateAsync();
            await googleLogout();
            navigate("/login");
        } catch (error: any) {
            setSnackbarContext({ open: true, severity: "error", message: error.message });
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
                            <TranslateText tKey="common:title" />
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
                                            <TranslateText tKey="common:hiUser" params={{ userName: userInfo.name }} />
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem component={Link} to="/profile">
                                                <ListItemIcon>
                                                    <AccountCircle />
                                                </ListItemIcon>
                                                <TranslateText tKey="profilePage:profile" />
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={logoutHandler}>
                                                <TranslateText tKey="authPage:logout" />
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </PopupState>
                        </>
                    ) : (
                        <Button component={Link} to="/login" color="inherit">
                            <TranslateText tKey="authPage:login" />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
