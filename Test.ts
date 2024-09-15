// TEST FILE //

interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    getUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): User[] {
        return this.users;
    }

    deactivateUser(id: number): void {
        const user = this.getUserById(id);
        if (user) {
            user.isActive = false;
        }
    }
}

const user1: User = { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true };
const user2: User = { id: 2, name: 'Bob', email: 'bob@example.com', isActive: true };


const userService = new UserService();
userService.addUser(user1);
userService.addUser(user2);

console.log('All Users:', userService.getAllUsers());

userService.deactivateUser(1);
console.log('User 1 after deactivation:', userService.getUserById(1));
console.log('All Users:', userService.getAllUsers());


// Console.log output:
// All Users: 
//   [
//     { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
//     { id: 2, name: 'Bob', email: 'bob@example.com', isActive: true }
//   ]
//   User 1 after deactivation: { id: 1, name: 'Alice', email: 'alice@example.com', isActive: false }
//   All Users: [
//     { id: 1, name: 'Alice', email: 'alice@example.com', isActive: false },
//     { id: 2, name: 'Bob', email: 'bob@example.com', isActive: true } 
//   ]