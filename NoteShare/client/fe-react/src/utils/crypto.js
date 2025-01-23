import CryptoJS from "crypto-js";

// Mã hóa ghi chú
export const encryptNote = (note, key) => {
  return CryptoJS.AES.encrypt(note, key).toString();
};

// Giải mã ghi chú
export const decryptNote = (encryptedNote, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedNote, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
