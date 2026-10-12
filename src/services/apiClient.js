const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
class ApiClient {
  static getHeaders() {
    const token = localStorage.getItem("eillish_auth_token");
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...token ? { Authorization: `Bearer ${token}` } : {}
    };
  }
  static async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders()
    });
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("eillish_auth_token");
        localStorage.removeItem("eillish_user_session");
      }
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
    }
    return await response.json();
  }
  static async post(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("eillish_auth_token");
        localStorage.removeItem("eillish_user_session");
      }
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
    }
    return await response.json();
  }
  static async put(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
    }
    return await response.json();
  }
  static async delete(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
    }
    return await response.json();
  }
}
export {
  ApiClient
};
