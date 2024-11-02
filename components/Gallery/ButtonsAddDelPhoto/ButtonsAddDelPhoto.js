import React, { useState } from "react";
import { ButtonAdd, ButtonDel } from "./ButtonsAddDelPhoto.styled";
import { UploadModal } from "../UploadModal/UploadModal";

export const ButtonAddPhoto = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonAdd onClick={() => setShowModal(true)}>Dodaj zdjęcie</ButtonAdd>
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export const ButtonDelPhoto = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonDel>Usuń zdjęcie</ButtonDel>
    </>
  );
};
