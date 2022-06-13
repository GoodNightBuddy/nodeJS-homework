const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    getAll() {
        return UserRepository.getAll()
    }

    create(data) {
        const users = UserRepository.getAll()
        if (users.find(el => el.email === data.email)) {
            throw new Error('This mail already exist')
        }
        if (users.find(el => el.phoneNumber === data.phoneNumber)) {
            throw new Error('This phone number already exist')
        }
        UserRepository.create(data)
    }

    update(id, dataToUpdate) {
        return UserRepository.update(id, dataToUpdate)
    }

    delete(id) {
        const user = UserRepository.getOne({id})
        if(!user) {
            throw new Error('User not found')
        }
        return UserRepository.delete(id)
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

// class BaseRepository {
//     constructor(collectionName) {
//         this.dbContext = dbAdapter.get(collectionName);
//         this.collectionName = collectionName;
//     }

//     generateId() {
//         return v4();
//     }

//     getAll() {
//         return this.dbContext.value();
//     }

//     getOne(search) {
//         return this.dbContext.find(search).value();
//     }

//     create(data) {
//         data.id = this.generateId();
//         data.createdAt = new Date();
//         const list = this.dbContext.push(data).write();
//         return list.find(it => it.id === data.id);
//     }

//     update(id, dataToUpdate) {
//         dataToUpdate.updatedAt = new Date();
//         return this.dbContext.find({ id }).assign(dataToUpdate).write();
//     }

//     delete(id) {
//         return this.dbContext.remove({ id }).write();
//     }
// }


module.exports = new UserService();