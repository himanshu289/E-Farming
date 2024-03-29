import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Farmer User 1',
    email: 'farmer1@example.com',
    password: bcrypt.hashSync('123456', 10),
    isFarmer: true,
  },
  {
    name: 'Farmer User 2',
    email: 'farmer2@example.com',
    password: bcrypt.hashSync('123456', 10),
    isFarmer: true,
  },
  {
    name: 'Farmer User 3',
    email: 'farmer3@example.com',
    password: bcrypt.hashSync('123456', 10),
    isFarmer: true,
  },
  {
    name: 'Farmer User 4',
    email: 'farmer4@example.com',
    password: bcrypt.hashSync('123456', 10),
    isFarmer: true,
  },
  {
    name: 'Farmer User 5',
    email: 'farmer5@example.com',
    password: bcrypt.hashSync('123456', 10),
    isFarmer: true,
  },
  {
    name: 'Omer Ben Yosef',
    email: 'omerby12@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Andi Shobash',
    email: 'andi@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
