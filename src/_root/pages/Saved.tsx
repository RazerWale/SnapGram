import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetUserSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { INewPost } from "@/types";
import { useEffect } from "react";

const Saved = () => {
  const { data: savedPostsUser, isPending: isLoading } = useGetUserSavedPosts();

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Saved Posts</h3>

          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-9 w-full max-w-5xl">
          {isLoading ? (
            <Loader />
          ) : savedPostsUser?.length !== 0 ? (
            <GridPostList posts={savedPostsUser} />
          ) : (
            <div>No saved posts!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
