import enProfileData from '@/data/profile-en.json';
import arProfileData from '@/data/profile-ar.json';

export function getProfileData(language: string) {
  switch (language) {
    case 'ar':
      return arProfileData;
    case 'en':
    default:
      return enProfileData;
  }
}

export default getProfileData;

