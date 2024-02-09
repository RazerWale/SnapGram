import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  const { data: userCurrent, isPending } = useGetCurrentUser();

  if (isPending) {
    return <Loader />;
  }
  const userPosts = userCurrent?.posts.filter((post) => {
    return post.save.length !== 0;
  });

  return (
    <div className="explore-container">
      <div className="flex my-12">
        <div className="md:w-60 w-32 sm:mx-0 mx-4">
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="md:h-20 md:w-20 h-16 w-16 rounded-full"
            />
          </Link>
        </div>
        <div className="">
          <div className="flex py-2">
            <div className="flex flex-col">
              <div className="text-2xl font-semibold py-1">{user.name}</div>
              <div className="text-sm text-light-3">@{user.username}</div>
            </div>
            <div className="mx-3">
              <Button variant="ghost" className="text-xs">
                <img
                  src="/assets/icons/edit.svg"
                  alt="delete"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                Edit profile
              </Button>
            </div>
          </div>
          <div className="flex py-2">
            <div className="flex flex-col pr-5">
              <div className="btns-purple">273</div>
              <div className="">Posts</div>
            </div>
            <div className="flex flex-col pr-5">
              <div className="btns-purple">147</div>
              <div className="">Folowers</div>
            </div>
            <div className="flex flex-col">
              <div className="btns-purple">151</div>
              <div className="">Following</div>
            </div>
          </div>
          <div className="flex py-2 flex-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            consequatur illum error ex cumque numquam inventore officia aut.
          </div>
          {/* <div className="flex ">
          <div className="py-2 px-2">
            <div className="">CYRCLE</div>
            <div className="">DESC</div>
          </div>
          <div className="py-2 px-2">
            <div className="">CYRCLE</div>
            <div className="">DESC</div>
          </div>
          <div className="py-2 px-2">
            <div className="">CYRCLE</div>
            <div className="">DESC</div>
          </div>
          <div className="py-2 px-2">
            <div className="">CYRCLE</div>
            <div className="">DESC</div>
          </div>
          <div className="py-2 px-2">
            <div className="">CYRCLE</div>
            <div className="">DESC</div>
          </div>
        </div> */}
        </div>
      </div>
      <div className="w-full">
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Posts</h3>

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
          {userPosts.length !== 0 && (
            <GridPostList key={userPosts.id} posts={userPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
