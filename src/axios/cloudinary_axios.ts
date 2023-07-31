import axios from 'axios';

export const cloudinary_config = {
  cloud: process.env.VITE_CLOUD_NAME,
  preset_key: process.env.VITE_PRESET_KEY,
};

export const cloundinary_link = (src?: string) =>
  'https://res.cloudinary.com/synasapmob/image/upload/' + src;

export const cloudinary_upload_type = {
  image: 'image/upload',
};

export default axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${cloudinary_config.cloud}/`,
});
