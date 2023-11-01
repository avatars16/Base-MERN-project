import { useTranslation } from "react-i18next";

interface Props {
    tKey: string;
    params?: Object;
}

const Text = ({ tKey, params }: Props) => {
    const { t } = useTranslation();
    return <>{t(tKey, params)}</>;
};

export default Text;
