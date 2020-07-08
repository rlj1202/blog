import Head from 'next/head'

import Layout from './Layout.js'

export default function DefaultLayout({ header, children }) {
    return (
        <Layout>
            <div className="top">
                <div className="header fixed-width">
                    {header}
                </div>
            </div>
            <div className="content-wrapper">
                <div className="content fixed-width">
                    {children}
                </div>
            </div>

            <style jsx>{`
            .top {
                margin: 0;
                background-color: #ff6565;
                box-shadow: 0 0 5pt black;
            
                color: white;
            }
            .fixed-width {
                max-width: 600pt;
                min-width: 0;
                padding: 0 20pt;
                margin: 0 auto;
            }
            .header {
                padding-top: 20pt;
                padding-bottom: 20pt;
            }
            .content-wrapper {
                margin: 20pt 0;
            }
            .footer {
                text-align: center;
                font-size: 9pt;

                margin: 20pt 0;
            }
            `}</style>

            <style jsx global>{`
            hr {
                border: 0;
                height: 1px;
                background-color: #00000014;

                margin: 20pt 0;
            }
            `}</style>
        </Layout>
    )
}