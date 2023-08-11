import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TablePagination } from "@mui/material";

export default function CheckLocaleChange() {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
            }}>
            <TablePagination count={2000} rowsPerPage={10} page={1} component="div" onPageChange={() => {}} />
            <DatePicker />
        </Box>
    );
}
