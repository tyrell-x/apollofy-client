import React from "react";

function ProfileMenu({ open, children, onClose }) {
    if (!open) return null;

    return <div>{children}</div>;
}

export default ProfileMenu;
