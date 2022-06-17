import axios from "axios";
import { notification  } from "ant-design-vue";
const baseUrl = 'http://localhost:13000/api/'
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const redirectTo = error?.response?.data?.redirectTo;
    if (redirectTo) {
      return (window.location.href = redirectTo);
    }
    notification.error({
      message: error?.response?.data?.errors?.map?.((error: any) => {
        return error.message
      }),
    });
    throw error;
  },
);
const api = {
  storage: localStorage,
  getLocale() {
    return this.storage.getItem('NOCOBASE_LOCALE');
  },

  setLocale(locale: string) {
    this.storage.setItem('NOCOBASE_LOCALE', locale || '');
  },

  getToken() {
    return this.storage.getItem('NOCOBASE_TOKEN');
  },

  setToken(token: string) {
    this.storage.setItem('NOCOBASE_TOKEN', token || '');
    if (!token) {
      this.setRole(null);
      this.setLocale(null);
    }
  },

  getRole() {
    return this.storage.getItem('NOCOBASE_ROLE');
  },

  setRole(role: string) {
    this.storage.setItem('NOCOBASE_ROLE', role || '');
  },
  signIn(url: string, data: object) {
    return axios.post(baseUrl + url, data).then((data)=>{
      this.setToken(data.data.data.token)
    })
  }
}
export default api