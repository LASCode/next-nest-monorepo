import { GetServerSideProps, GetStaticPaths } from "next";
import { apiGetUserById, apiGetUsers } from "@/api";
import { PageLayout } from "@/layouts/PageLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { User } from "@/types";


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

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await apiGetUsers();

    return ({
        paths: users.map((el) => ({params: {id: el.id}})),
        fallback: false,
    })
};
export const getStaticProps: GetServerSideProps = async ({params}) => {
    const id = params?.id as string;
    const user = await apiGetUserById(id);
    return ({ props: { user } });
}