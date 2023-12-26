import { ComponentProps } from "react";
import StandardButton from "./StandardButton";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
    tKey: string;
    loading: boolean;
    buttonProps?: ComponentProps<typeof LoadingButton>;
};

const SecondaryButton = ({ tKey, buttonProps, loading }: Props) => {
    return (
        <StandardButton
            buttonProps={{ ...buttonProps, color: "primary", variant: "outlined" }}
            tKey={tKey}
            loading={loading}
        />
    );
};

export default SecondaryButton;
