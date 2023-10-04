import { useState } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Psychology, AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import DarkModeToggle from "./DarkModeToggle";
import Text from "./Text";
import LocaleToggle from "./LocaleToggle";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); //The element beneath the menu should open
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            <Text tKey="header.title" />
                        </Typography>
                    </Box>
                    <LocaleToggle />
                    <DarkModeToggle />
                    {userInfo ? (
                        <>
                            <Button color="inherit" onClick={handleClick}>
                                <Text tKey="header.hiUser" params={{ userName: userInfo.name }} />
                            </Button>
                            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                                <MenuItem component={Link} to="/profile">
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <Text tKey="header.profile" />
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logoutHandler}>
                                    <Text tKey="header.logout" />
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button component={Link} to="/login" color="inherit">
                            <Text tKey="authPage.login" />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
