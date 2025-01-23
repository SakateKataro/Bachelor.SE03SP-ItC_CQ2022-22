import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/", // URL backend NestJS
});

// Đăng ký người dùng
export const register = (data) => API.post("/auth/register", data);

// Đăng nhập
export const login = (data) => API.post("/auth/login", data);

// Lấy danh sách ghi chú
export const getNotes = (token) =>
  API.get("/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Tạo ghi chú mới
export const createNote = (data, token) =>
  API.post("/notes", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Chia sẻ ghi chú
export const shareNote = (noteId, token) =>
  API.post(
    `/notes/${noteId}/share`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
