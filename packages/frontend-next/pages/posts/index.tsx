import {PageLayout} from "@/layouts/PageLayout";
import {GetServerSideProps} from "next";
import {Post} from "@/types/Post.types";
import {apiGetPosts} from "@/api/apiGetPosts";
import {PostCard} from "@/components/PostCard";

interface PostsPageProps {
    posts: Post[]
}
export default function PostsPage({posts}: PostsPageProps) {
    return (
        <PageLayout title={`Рандомные посты. Да.`}>
            {posts.map((el) => <PostCard key={el.id} postData={el}/>)}
        </PageLayout>
    )
};
export const getStaticProps: GetServerSideProps = async () => {
    const posts = await apiGetPosts();
    return ({ props: { posts } });
}