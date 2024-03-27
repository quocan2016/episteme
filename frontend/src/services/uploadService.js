import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { convertToMB } from "../utils/convertSize";

// import axios from "axios";
// import { API_GET_IMAGE, API_SAVE_IMAGE } from "../constants/api";
// export const uploadImage = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   const response = await axios({
//     method: "post",
//     url: API_SAVE_IMAGE,
//     data: formData,
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return `${API_GET_IMAGE}/${response.data.data}`;
// };

export const uploadImage = async (image) => {
  const imagePath = uuidv4() + image.name;
  const storageRef = ref(storage, `images/${imagePath}`);
  const snapshot = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);

  return url;
};

export const uploadFile = async (file) => {
  try {
    const size = convertToMB(file.size);
    if (size > 16) {
      return {
        error: "Tệp tin phải nhỏ hơn 16MB",
      };
    }
    const filePath = uuidv4() + file.name;
    const storageRef = ref(storage, `files/${filePath}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return {
      url,
      title: file.name,
      size: file.size,
      error: "",
    };
  } catch (e) {
    return { error: e.message };
  }
};
