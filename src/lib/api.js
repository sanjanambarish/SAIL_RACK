// API Client for communicating with the backend server
const API_BASE_URL = '/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async signUp(email, password, fullName) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
    
    if (data.session?.access_token) {
      this.setToken(data.session.access_token);
    }
    
    return data;
  }

  async signIn(email, password) {
    const data = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.session?.access_token) {
      this.setToken(data.session.access_token);
    }
    
    return data;
  }

  async signOut() {
    await this.request('/auth/signout', { method: 'POST' });
    this.setToken(null);
  }

  async getSession() {
    try {
      const data = await this.request('/auth/session');
      return { data: { session: data }, error: null };
    } catch (error) {
      return { data: { session: null }, error };
    }
  }

  async getCurrentUser() {
    try {
      const data = await this.request('/auth/session');
      return { data: { user: data.user }, error: null };
    } catch (error) {
      return { data: { user: null }, error };
    }
  }

  async getUserProfile(userId) {
    try {
      const data = await this.request(`/profiles/${userId}`);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Stockyards
  async getStockyards() {
    return this.request('/stockyards');
  }

  // Wagons
  async getWagons() {
    return this.request('/wagons');
  }

  // Formation plans
  async getFormationPlans() {
    return this.request('/formation-plans');
  }

  async createFormationPlan(plan) {
    return this.request('/formation-plans', {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  // Routes
  async getRoutes() {
    return this.request('/routes');
  }

  // KPI snapshots
  async getKpiSnapshots() {
    return this.request('/kpi-snapshots');
  }

  // AI Recommendations
  async getAiRecommendations() {
    return this.request('/ai-recommendations');
  }

  // Conflicts
  async getConflicts() {
    return this.request('/conflicts');
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  // Dashboard
  async getDashboardMetrics() {
    return this.request('/dashboard/metrics');
  }

  // Query builder for more complex queries (similar to Supabase)
  from(table) {
    return {
      select: async (columns = '*') => {
        const data = await this.request(`/${table}`);
        return { data, error: null };
      },
      insert: async (values) => {
        const data = await this.request(`/${table}`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        return { data, error: null };
      },
    };
  }
}

export const api = new ApiClient();

// Compatibility layer for existing Supabase code
export const supabase = {
  auth: {
    signUp: async ({ email, password }) => {
      try {
        const data = await api.signUp(email, password);
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
    signInWithPassword: async ({ email, password }) => {
      try {
        const data = await api.signIn(email, password);
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
    signOut: async () => {
      try {
        await api.signOut();
        return { error: null };
      } catch (error) {
        return { error };
      }
    },
    getSession: () => api.getSession(),
    getUser: () => api.getCurrentUser(),
  },
  from: (table) => api.from(table),
};

export const getSession = async () => {
  const { data } = await api.getSession();
  return data.session;
};

export const getCurrentUser = async () => {
  const { data } = await api.getCurrentUser();
  return data.user;
};

export const getUserProfile = async (userId) => {
  const { data } = await api.getUserProfile(userId);
  return data;
};
