import { useState } from "react";

export const useAvatar = (initialAvatar = "") => {
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(initialAvatar);

  const avatarChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setAvatarPreview(initialAvatar);
      return setAvatar("");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
    reader.readAsDataURL(file);
  };
  return { avatar, avatarPreview, avatarChangeHandler };
};
