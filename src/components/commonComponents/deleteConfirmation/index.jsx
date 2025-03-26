import { IconStore } from "@/utils/helperFunctions/iconStore";
import Button from "../button";

const DeleteConfirmation = ({
  content = "",
  handleDelete,
  handleClose,
  loader,
}) => {
  return (
    <div
      className="bg-black/75 h-dvh w-dvw flex justify-center items-center fixed top-0 left-0 z-[999]"
      onClick={handleClose}
    >
      <div
        className={`bg-white absolute rounded-2xl max-w-[90%] md:max-w-[36rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-6 p-[1.5rem]">
          <IconStore.trash className=" size-9 stroke-red-400" />
          <p className="text-[#231F20] font-medium min-[375px]:max-w-[60%] text-center">
            {content}
          </p>
        </div>
        <div className="flex gap-4 w-full border-t p-[15px] pt-6">
          <Button
            type="secondary"
            label="No"
            classNames={{ root: "grow justify-center" }}
            onClick={handleClose}
          />
          <Button
            type="primary"
            label="Yes"
            loading={loader}
            classNames={{ root: "grow justify-center" }}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
