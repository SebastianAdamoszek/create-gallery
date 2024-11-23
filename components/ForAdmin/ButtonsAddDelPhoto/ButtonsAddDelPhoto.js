import React, { useState } from "react";
import { ButtonAdd, ButtonDel } from "./ButtonsAddDelPhoto.styled";
import { UploadModalForAdmin } from "../UploadModal/UploadModal";

export const ButtonAddPhoto = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonAdd onClick={() => setShowModal(true)}>Dodaj zdjęcie</ButtonAdd>
      {showModal && <UploadModalForAdmin onClose={() => setShowModal(false)} userId={userId} />}
    </>
  );
};

export const ButtonDelPhoto = ({ toggleDeleteMode, isDeleteMode, userId }) => {
  return (
    <ButtonDel onClick={toggleDeleteMode} $userId={userId}>
      {" "}
      {isDeleteMode ? "Anuluj usuwanie" : "Usuń zdjęcie"}
    </ButtonDel>
  );
};
