import PropTypes from "prop-types";

import { UserAvatar, BackgroundAvatar } from "../image";

export default function UserProfilePreview({
  username,
  displayName,
  aboutMe,
  avatar,
  backgroundAvatar,
  renderProfileButton,
  className,
  children,
}) {
  const profileButton = renderProfileButton();

  return (
    <div className={className}>
      <div
        className='grid gap-5 rounded-full border border-slate-900 p-2'
        data-testid='user-profile-preview'
      >
        <BackgroundAvatar asset={backgroundAvatar} alt='Profile background' type='user' />

        <UserAvatar
          asset={avatar}
          alt={`${displayName || username}'s avatar`}
          type='user'
          className='-mt-5 w-20 rounded-full bg-black'
        />

        <div>
          <div>
            <h3 className='font-bold'>{displayName}</h3>

            <p className='font-extralight'>{username}</p>
          </div>

          <div>
            <p>{aboutMe}</p>
          </div>
        </div>

        {profileButton}
      </div>

      {children}
    </div>
  );
}

UserProfilePreview.propTypes = {
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  aboutMe: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        size: PropTypes.number,
        format: PropTypes.string,
      })
    ),
  }),
  backgroundAvatar: PropTypes.shape({
    url: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        size: PropTypes.number,
        format: PropTypes.string,
      })
    ),
  }),
  renderProfileButton: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
