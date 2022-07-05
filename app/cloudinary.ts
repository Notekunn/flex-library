import { v2 as cloudinary } from 'cloudinary';
import Constants from 'expo-constants';

cloudinary.config(Constants?.manifest?.extra?.cloudinary);

export default cloudinary;
