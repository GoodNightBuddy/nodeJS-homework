const UserService = require('./userService');

class AuthService {
    login(userData) {
        const user = UserService.search(userData);
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = new AuthService();