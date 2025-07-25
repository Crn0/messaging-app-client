import Proptypes from "prop-types";

import { MessageAttachment } from "../../../components/ui/preview";
import { cn } from "../../../utils";

export default function MessageAttachments({ attachments }) {
  if (attachments.length <= 0) return null;

  return (
    <div className='flex flex-wrap gap-1'>
      {attachments.map((attachment, i) => (
        <MessageAttachment
          key={attachment.id}
          attachment={attachment}
          className={cn("shrink-0 grow-1", `${i <= 1 ? "basis-[45%]" : "basis-[25%]"}`)}
        />
      ))}
    </div>
  );
}

MessageAttachments.propTypes = {
  attachments: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      url: Proptypes.string.isRequired,
      type: Proptypes.oneOf(["Image", "Epub", "Pdf"]),
      images: Proptypes.arrayOf(
        Proptypes.shape({
          url: Proptypes.string.isRequired,
          size: Proptypes.number.isRequired,
          format: Proptypes.string.isRequired,
        })
      ),
    })
  ),
};
