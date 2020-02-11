export interface User {
    _id?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  age: number;
}


export const Users: User[] = [{
  firstName: 'Alexander',
  lastName: 'Vlasov',
  nickName: 'ASVlasov',
  email: 'asvlasov@gmail.com',
  age: 31
}, {
  firstName: 'Elena',
  lastName: 'Maltseva',
  nickName: 'ElenaMaltseva',
  email: 'zzzarazzza@gmail.com',
  age: 31
}];
