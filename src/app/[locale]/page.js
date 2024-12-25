import initTranslations from "../i18n";
export default async function Home({ params }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, [locale]);
  return (
    <div>
      <h1 className="pr h1">{t("hakeem")}</h1>
    </div>
  );
}
