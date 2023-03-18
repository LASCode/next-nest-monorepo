import {useRouter} from "next/router";
import Link from "next/link";
import {GetServerSideProps, NextPageContext} from "next";
import {getUsers} from "@/api";
import {Header} from "@/components/Header/Header";


interface ProfileAnyProps {
    users: { name: string }[]
}
export default function ProfileAny({users}: ProfileAnyProps) {
    const { query } = useRouter();

    return (
        <>
            <Header />
            <div>Ого, енто же профиль {query.id}</div>
            <div>{users.map((el) => <div key={el.name}><Link href={'/'}>{el.name}</Link></div>)}</div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const users = await getUsers();
    return ({
        props: {
            users
        }
    });
}