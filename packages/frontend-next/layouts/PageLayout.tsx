import {ReactNode} from "react";
import {Header} from "@/components/Header";

import styles from './PageLayout.module.scss';
import cnBind from 'classnames/bind';
import Head from "next/head";
const cx = cnBind.bind(styles);

interface PageLayoutProps {
    title?: string,
    children: ReactNode,
}
export const PageLayout = ({children, title}: PageLayoutProps) => {

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                {title && <title>{title}</title>}
            </Head>
            <div className={cx('page')}>
                <Header/>
                <main className={cx('content')}>
                    {children}
                </main>
            </div>
        </>
    );
};