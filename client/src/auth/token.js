
class Token{
  constructor(){
    this.accessToken = null;
  }
  setToken(token) {
    this.accessToken = token;
  }
  
  getToken() {
    return this.accessToken;
  }
  
  isAuthenticated() {
    return !!this.getToken();
  }
}

export const token = new Token();