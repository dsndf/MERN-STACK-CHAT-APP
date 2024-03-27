import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";

export const createUsers = async (numberOfUsers) => {
  const createUserPromises = [];
  for (let i = 0; i < numberOfUsers; i++) {
    createUserPromises.push(
      User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(20),
        avatar: {
          url: faker.image.url(),
          public_id: faker.system.fileName(),
        },
        password: "password", 
      })
    );
  }
  await Promise.all(createUserPromises);
  console.log("USERS CREATED");
};
