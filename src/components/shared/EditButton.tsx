import { Button } from "../ui/button";

const EditButton = () => {
  return (
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
  );
};

export default EditButton;
