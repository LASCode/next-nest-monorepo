import {User} from "@/types";

import styles from './UserCard.module.scss';
import cnBind from 'classnames/bind';
import {GetServerSideProps} from "next";
import {apiGetUsers} from "@/api";
import Image from "next/image";
import {useRouter} from "next/router";
import {useCallback} from "react";
const cx = cnBind.bind(styles);

interface UserCardProps {
    userData: User,
}
export const UserCard = ({userData}: UserCardProps) => {
    const navigation = useRouter()
    
    const onCardClick = useCallback(() => {
        void navigation.push(`/profile/${userData.id}`)
    }, [navigation, userData.id])

    return (
        <div className={cx('user-card')} onClick={onCardClick}>
            <Image className={cx('user-avatar')} src={userData.avatar} alt='UserAvatar' width={60} height={60} />
            <div className={cx('user-info')}>
                <span>{userData.name}</span>
                <span>{userData.username}</span>
                <span>Роль: {userData.roles.join(', ')}</span>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const users = await apiGetUsers();
    return ({ props: { users } });
}