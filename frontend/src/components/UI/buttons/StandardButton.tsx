import LoadingButton from "@mui/lab/LoadingButton";
import { ComponentProps } from "react";
import TranslateText from "../../shared/TranslateText";
type Props = {
    buttonProps: ComponentProps<typeof LoadingButton>;
    tKey: string;
    loading: boolean;
};

const StandardButton = ({ buttonProps, tKey, loading }: Props) => {
    return (
        <LoadingButton variant="contained" size="medium" fullWidth {...buttonProps} loading={loading}>
            <TranslateText tKey={tKey} />
        </LoadingButton>
    );
};

export default StandardButton;
