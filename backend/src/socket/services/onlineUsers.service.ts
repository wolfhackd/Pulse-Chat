class OnlineUsersService {
   private users = new Map<string, string>();

   addUser(userId:string, socketId: string) {
      this.users.set(userId, socketId);
   }

   removeUser(userId: string) {
        this.users.delete(userId);
   };

    getAll(){
        return [...this.users.entries()];
    }
    getSocket(userId: string){
        return this.users.get(userId);
    }
    isOnline(userId: string){
        return this.users.has(userId);
    }

}

export const onlineUsersService = new OnlineUsersService();