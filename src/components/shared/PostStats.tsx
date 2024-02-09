import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  // console.log(currentUser);

  // bool to find if post have been saved or not by this user
  // if current user saved the post, it will contain that post in user obj
  const savedPostRecord = currentUser?.save.find(
    // .find method, finds first match and return it
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // it will not trigger further

    let newLikes = [...likes]; // spread ids of liked post users into a new array

    const hasLiked = newLikes.includes(userId); // set the bool, if user id already in the array, it will return true

    if (hasLiked) {
      // check if user liked the post
      newLikes = newLikes.filter((id) => id !== userId); // filter throught the array and return ids that is not current user. so bassicaly deletes user from an array
    } else {
      newLikes.push(userId); // if user id is not in array, it will add it to array
    }

    setLikes(newLikes); // sets new array with ids to the likes state
    likePost({ postId: post?.$id || "", likesArray: newLikes }); // sets a new array of ids to the DB
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // it will not trigger further

    // if post is saved, setIsSaved state to false and delete record from DB.
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || "", userId }); // sets new array with ids to the likes state
      // savePost({ postId: post?.$id || "", userId }); // sets new array with ids to the likes state
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
