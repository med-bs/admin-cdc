import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { LogoutOutlined } from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import { ColorModeContext, tokens } from "../../theme";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout");
        navigate("/signin");
    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                    <Link to={'/profile'} />
                </IconButton>
                <IconButton onClick={handleLogout} >
                    <LogoutOutlined />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TopBar;