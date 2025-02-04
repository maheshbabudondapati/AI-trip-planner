import axiosInstance from '../utils/axiosConfig';

const profileService = {
  async getProfile(userId) {
    try {
      const response = await axiosInstance.get(`/api/profiles/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};

export default profileService;