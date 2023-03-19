import {User} from "@/types";
import Image from "next/image";


import styles from './ProfileCard.module.scss';
import cnBind from 'classnames/bind';
const cx = cnBind.bind(styles);

interface ProfileCardProps {
    userData: User,
    itsMe: boolean
}
export const ProfileCard = ({ userData, itsMe }: ProfileCardProps) => {


    return (
        <div className={cx('profile')}>
            <Image className={cx('profile-image')} src={userData.avatar} alt='UserAvatar' height={250} width={250} />
            <div className={cx('profile-info')}>
                <span>Имя: {userData.name}</span>
                <span>Юзернейм: {userData.username}</span>
                <span>Роль: {userData.roles.join(', ')}</span>
            </div>
            <div className={cx('profile-id')}>
                Идентификатор: {userData.id}
            </div>
        </div>
    )
};