import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/app/i18n/i18n'; // Import our new server-side helper

interface HeroSectionProps {
  lng: string; // The component now needs to know the current language
  backgroundImageUrl: string;
  ctaLink: string;
}

// Make the component async so we can await translations
export default async function HeroSection({ lng, backgroundImageUrl, ctaLink }: HeroSectionProps) {
  // Fetch the translation function 't' for the given language
  const { t } = await getTranslation(lng);

  const sectionStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
    <section
      className="relative w-full h-[60vh] md:h-[75vh] bg-cover bg-center text-white"
      style={sectionStyle}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
        
        {/* Use the 't' function to get the content from your JSON file */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
          {t('hero.headline')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-sm">
          {t('hero.tagline')}
        </p>
        <Link href={ctaLink} className="mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
            {t('hero.ctaText')}
          </Button>
        </Link>
      </div>
    </section>
  );
}