import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllAccounts } from "../../api/bank/accountSlice";
import CircularProgressBar from "../CircularProgressBar";
import ErrorBar from "../ErrorBar";


const Accounts = ({ custumerId, setRequestHistory }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    const { accounts, isErrorAcc, isLoadingAcc, messageAcc } = useSelector(
        (state) => state.accounts
    );

    const viewHistory = (account) => {
        setRequestHistory({
            accountId: account,
            customerId: custumerId,
            page: 0,
            size: 7,
        });
    }

    useEffect(() => {

        if (!isNaN(custumerId)) {
            dispatch(getAllAccounts(custumerId));
        }
    }, [custumerId, dispatch])

    if (isLoadingAcc) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        return (
            <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        Accounts List
                    </Typography>
                </Box>
                {accounts?.map((account) => (

                    <Box
                        key={`${account?.id}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                    >
                        <Box>
                            <Typography
                                color={
                                    account?.type === "SavingAccount" ?
                                        colors.greenAccent[500] :
                                        colors.redAccent[500]
                                }
                                variant="h5"
                                fontWeight="600"
                            >
                                {account?.type}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                {account?.id}
                            </Typography>
                        </Box>
                        <Box color={colors.grey[100]}>{new Date(account?.createdAt).toLocaleString('en-US')}</Box>

                        <Button onClick={() => { viewHistory(account) }}>
                            <Box
                                backgroundColor={
                                    account?.type === "SavingAccount" ?
                                        colors.greenAccent[500] :
                                        colors.redAccent[500]
                                }
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                ${account?.balance}
                            </Box>
                        </Button>
                    </Box>
                ))}
                <ErrorBar isOpen={isErrorAcc} title={"Accounts list"} message={messageAcc} />

            </Box>
        );
    }
}

export default Accounts;