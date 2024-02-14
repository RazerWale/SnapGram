import { Models } from "appwrite";
import { Button } from "../ui/button";
import { useFollowUser } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";
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

  console.log(followingList);

  const [following, setFollowing] = useState(followingList);

  const { mutate: followUser } = useFollowUser();

  const handleFollowUser = async (e: React.MouseEvent) => {
    e.stopPropagation(); // it will not trigger further

    let newFollowing = [...following]; // spread ids of liked post users into a new array

    const isFollowing = newFollowing.includes(user.$id); // set the bool, if user id already in the array, it will return true

    if (isFollowing) {
      // check if user liked the post
      newFollowing = newFollowing.filter((id) => id !== user.$id); // filter throught the array and return ids that is not current user. so bassicaly deletes user from an array
    } else {
      newFollowing.push(user.$id); // if user id is not in array, it will add it to array
    }

    setFollowing(newFollowing); // sets new array with ids to the likes state
    followUser({ userId: userCurrent.$id, followingArray: newFollowing }); // sets a new array of ids to the DB
  };
  return (
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
