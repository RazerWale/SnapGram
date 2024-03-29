import { Models } from "appwrite";
import { Button } from "../ui/button";
import {
  useFollowUser,
  useSaveFollowers,
} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";
import { checkIsFollowing } from "@/lib/utils";

type FollowButtonProps = {
  user: Models.Document;
  userCurrent: Models.Document;
};

const FollowButton = ({ user, userCurrent }: FollowButtonProps) => {
  // eslint-disable-next-line no-debugger
  //   debugger;
  console.log(user);
  console.log(user.$id);
  console.log(userCurrent);
  const followingList = userCurrent?.following.map(
    (followingIds: Models.Document) => followingIds
  );
  const followersList = user?.followers.map(
    (followersIds: Models.Document) => followersIds
  );
  console.log(followingList);
  console.log(followersList);

  const [following, setFollowing] = useState(followingList);
  const [followers, setFollowers] = useState(followersList);

  const { mutate: followUser } = useFollowUser();
  const { mutate: saveFollowers } = useSaveFollowers();

  const handleFollowUser = async (e: React.MouseEvent) => {
    e.stopPropagation(); // it will not trigger further

    let newFollowing = [...following];
    let newFollowers = [...followers];

    const isFollowing = newFollowing.includes(user.$id); // set the bool, if user id already in the array, it will return true

    if (isFollowing) {
      newFollowing = newFollowing.filter((id) => id !== user.$id);
      newFollowers = newFollowers.filter((id) => id !== userCurrent.$id);
    } else {
      newFollowing.push(user.$id);
      newFollowers.push(userCurrent.$id);
    }

    setFollowing(newFollowing);
    setFollowers(newFollowers);
    followUser({ userId: userCurrent.$id, followingArray: newFollowing });
    saveFollowers({ userId: user.$id, followersArray: newFollowers });
  };
  return checkIsFollowing(following, user.$id) ? (
    <Button
      type="button"
      size="sm"
      className="shad-button_secondary px-5 my-1"
      onClick={handleFollowUser}
    >
      Following
    </Button>
  ) : (
    <Button
      type="button"
      size="sm"
      className="shad-button_primary px-5 my-1"
      onClick={handleFollowUser}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
