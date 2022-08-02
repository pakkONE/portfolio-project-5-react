import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDropdown.module.css";
import { useNavigate } from "react-router-dom";

export const EditIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className="far fa-edit"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const EditDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="start">
      <Dropdown.Toggle as={EditIcon} />

      <Dropdown.Menu className="text-center">
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={EditIcon} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="far fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="fas fa-pen" />
          Change Username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-lock" />
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
