import { useTranslation } from "react-i18next";

interface Props {
    tKey: string;
    params?: Record<string, string>;
}

const TranslateText = ({ tKey, params }: Props) => {
    const { t } = useTranslation();
    return <>{t(tKey, params)}</>;
};

export default TranslateText;
