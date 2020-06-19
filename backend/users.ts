export class User{

    constructor(
        public name: string,
        public email: string,
        private password: string
    ){}

    existe(user: User): boolean{
        return user !== undefined && user.email === this.email && user.password === this.password
    }
}

export const users: User[] = [
   new User('vinicius', 'testeVini@hotmail.com', 'testeVini123'),
   new User('sthefanie', 'testeSthe@hotmail.com', 'testeSthe123')
]