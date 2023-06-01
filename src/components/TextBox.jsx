import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const TextBox = ({ title, subtitle, sx_gridColumn }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            sx={{ gridColumn: sx_gridColumn }}
            alignItems="center"
            justifyContent="space-evenly"
            borderRadius={"10px"}
        >
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title} :
            </Typography>
            <Typography variant="h4" color={colors.greenAccent[400]}  >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default TextBox;