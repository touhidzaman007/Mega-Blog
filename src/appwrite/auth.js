import conf from '../conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Signup
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log('Error creating account', error);
    }
  }

  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log('Error logging in', error);
    }
  }

  // Get Current State of User
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Error getting current user', error);
    }
    return null;
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log('Error logging out', error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
