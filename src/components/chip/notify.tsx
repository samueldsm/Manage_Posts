import { Chip } from "@nextui-org/chip";

import { CheckIcon } from "./check_icon";

/*TODO: Fix this component to sync based on action (Insert, Edit, Delete) */
export default function NotifyChip() {
  return (
    <div className="flex gap-4 my-1">
      <Chip
        startContent={
          <CheckIcon size={18} height={undefined} width={undefined} />
        }
        variant="faded"
        color="success"
      >
        Post added succesfully
      </Chip>
    </div>
  );
}
