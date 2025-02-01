import axiosInstance from '../utils/axiosConfig';

const authService = {
  async signUp(email, password, name, avatarImgUrl) {
    try {
      // Add CORS headers and credentials
      const response = await axiosInstance.post('/api/auth/signup', {
        email,
        password,
        name,
        avatarImgUrl
      });

      const { user, token } = response.data;

      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      console.error('SignUp Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.message || 'Failed to sign up');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Server not responding. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Network error. Please check your connection.');
      }
    }
  },

  async signIn(email, password) {
    try {
      const response = await axiosInstance.post('/api/auth/signin', {
        email,
        password
      });

      const { user, token } = response.data;

      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      console.error('SignIn Error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to sign in');
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      } else {
        throw new Error('Network error. Please check your connection.');
      }
    }
  },

  signOut() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('SignOut Error:', error);
    }
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      this.signOut(); // Clear potentially corrupted data
      return null;
    }
  },

  getToken() {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default authService;