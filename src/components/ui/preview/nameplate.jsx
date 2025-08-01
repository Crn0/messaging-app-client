import PropTypes from "prop-types";

import { cn } from "../../../utils";
import { UserAvatar } from "../image";

export default function NameplatePreview({ username, displayName, className, asset }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <UserAvatar asset={asset} alt={`${displayName || username}'s avatar`} variant='user' />
      <p className='w-45 overflow-hidden font-sans text-sm overflow-ellipsis whitespace-nowrap'>
        {displayName || username}
      </p>
    </div>
  );
}

NameplatePreview.propTypes = {
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  className: PropTypes.string,
  asset: PropTypes.shape({
    url: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        size: PropTypes.number,
        format: PropTypes.string,
      })
    ),
  }),
};
