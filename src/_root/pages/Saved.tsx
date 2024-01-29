import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const Saved = () => {
  const { data: user, isPending } = useGetCurrentUser();

  if (isPending) {
    return <Loader />;
  }
  const savedPosts = user.posts.filter((post) => {
    return post.save.length !== 0;
  });

  return (
    <div className="flex justify-center flex-wrap gap-9 w-full max-w-5xl">
      {savedPosts.length !== 0 && (
        <GridPostList key={savedPosts.id} posts={savedPosts} />
      )}
    </div>
  );
};

export default Saved;
