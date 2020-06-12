import Head from 'next/head'

export default function Layout(props) {
    return (
        <div className="container">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href={`${process.env.baseUrl}/favicon.ico`}></link>
            </Head>

            {props.children}

            <style>{`
            .container {
            }
            `}</style>

            <style jsx global>{`
            @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);

            html, body {
                margin: 0;
                padding: 0;

                font-family: 'Noto Sans KR', sans-serif;
            }

            a {
                color: inherit;
                text-decoration: none;
            }

            * {
                box-sizing: border-box;
            }
            `}</style>
        </div>
    )
}