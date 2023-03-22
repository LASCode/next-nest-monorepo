import {Post} from "@/types/Post.types";
import Link from "next/link";

import styles from './PostCard.module.scss';
import cnBind from 'classnames/bind';
const cx = cnBind.bind(styles);

interface PostCardProps {
    postData: Post;
}
export const PostCard = ({ postData }: PostCardProps) => {


    return (
        <div className={cx('post-card')}>
            <div className={cx('header')}>
                <span>{postData.title}</span>
                <span>Автор: <Link href={`/profile/${postData.userId}`}>{postData.userId}</Link></span>
            </div>
            <div className={cx('body')}>{postData.body}</div>
        </div>
    )
};