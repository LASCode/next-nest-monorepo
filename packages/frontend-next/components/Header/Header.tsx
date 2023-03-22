import Link from "next/link";
import styles from './Header.module.scss';
import cnBind from 'classnames/bind';
const cx = cnBind.bind(styles);

export const Header = () => {
    const routes = [
        {title: "Трекер", href: "/tracker"},
        {title: "Коллеги", href: "/users"},
        {title: "Посты", href: "/posts"}
    ];

    return (
        <header className={cx('header')}>
            <div className={cx('content')}>
                <Link className={cx('logo')} href={'/'}>
                    TrackMe
                </Link>
                <nav className={cx('navigation')}>
                    {routes.map((el) =>
                        <Link key={el.href} href={el.href}>
                            {el.title}
                        </Link>
                    )}
                </nav>
                <Link href={'/profile'}>
                    Мой профиль
                </Link>
            </div>
        </header>
    );
};