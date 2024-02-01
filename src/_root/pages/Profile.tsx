import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  return (
    <div className="flex my-12">
      <div className="w-60">
        <Link to={`/profile/${user.id}`} className="flex-center gap-3">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-20 w-20 rounded-full"
          />
        </Link>
      </div>
      <div className="">
        <div className="flex py-2">
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">{user.name}</div>
            <div className="text-sm text-light-3">@{user.username}</div>
          </div>
          <div className="">Edit Profile</div>
        </div>
        <div className="flex py-2">
          <div className="flex flex-col">
            <div className="">273</div>
            <div className="">Posts</div>
          </div>
          <div className="flex flex-col">
            <div className="">147</div>
            <div className="">Folowers</div>
          </div>
          <div className="flex flex-col">
            <div className="">151</div>
            <div className="">Following</div>
          </div>
        </div>
        <div className="flex py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          consequatur illum error ex cumque numquam inventore officia aut.
        </div>
        <div className="flex ">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
