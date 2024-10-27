import React, { useState } from "react";
import { Button } from "./ButtonAddPhoto.styled";
import { UploadModal } from "../UploadModal/UploadModal";

export const ButtonAddPhoto = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Dodaj zdjęcie</Button>
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </>
  );
};
