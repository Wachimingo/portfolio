import Link from "next/link";
import { useRouter } from "next/router";

export const LocaleSwitcher = () => {
    const { locales, locale, pathname, query, asPath } = useRouter();
    const otherLocales = locales.filter((l) => l !== locale); // Find all the locales apart from the current locale.
    // const otherLocales = ['es', 'en']

    return (
        <>
            {otherLocales.map((locale) => {
                return (
                    <Link
                        key={locale}
                        href={{ pathname, query }}
                        as={asPath}
                        locale={locale}
                    >
                        <a
                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-7"
                        >
                            {locale}
                        </a>
                    </Link>
                );
            })}
        </>
    )
}