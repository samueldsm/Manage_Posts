import { Button } from "@nextui-org/react";

export default function FormPostButton({
  setIsFormOpen,
}: {
  setIsFormOpen: (value: boolean) => void;
}) {
  return (
    <Button
      type="button"
      color="secondary"
      onClick={() => setIsFormOpen(true)}
      variant="ghost"
      className="text-white  focus:ring-4 font-medium rounded-lg text-sm  py-2.5 text-center max-w-xs  items-start focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 "
    >
      Add a new post
    </Button>
  );
}
