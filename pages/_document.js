import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Partytown } from '@builder.io/partytown/react';
export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        return (
            <Html>
                <Head>
                    <Partytown />
                    <script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} type="text/partytown" />
                    <script type="text/partytown">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                            page_path: window.location.pathname,
                            });
                        `}
                    </script>
                    <Partytown debug={true} />
                </Head>
                <body className={pageProps.customClass}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}