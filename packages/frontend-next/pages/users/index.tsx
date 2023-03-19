import {GetServerSideProps} from "next";
import {getUsers} from "@/api";
import {User} from "@/types";
import {PageLayout} from "@/layouts/PageLayout";
import {UserCard} from "@/components/UserCard";

import styles from '@/styles/Users.module.scss';
import cnBind from 'classnames/bind';
const cx = cnBind.bind(styles);

interface UsersPageProps {
    users: User[],
}
export default function UsersPage({users}: UsersPageProps) {

    return (
        <PageLayout title={`Список пользователей`}>
            <div className={cx('content')}>
                {users.map((el) => (
                    <UserCard key={el.id} userData={el}/>
                ))}
            </div>
        </PageLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async () => {
    const users = await getUsers();
    return ({ props: { users } });
}