import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t('hakeem')}</h1>
      <Link href="/about">{t('welcomeBack')}</Link>
    </div>
  );
}