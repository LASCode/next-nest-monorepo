import {useRouter} from "next/router";
import Link from "next/link";
import {GetServerSideProps, NextPageContext} from "next";
import {getUserById, getUsers} from "@/api";
import {Header} from "@/components/Header/Header";
import {PageLayout} from "@/layouts/PageLayout";
import {ProfileCard} from "@/components/ProfileCard";
import {User} from "@/types";


interface ProfileAnyProps {
    user: User
}
export default function ProfileAny({user}: ProfileAnyProps) {
    return (
        <PageLayout title={`Профиль ${user.name}`}>
            <ProfileCard userData={user} itsMe={false} />
        </PageLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const id = params?.id as string;
    const user = await getUserById(id);
    return ({ props: { user } });
}