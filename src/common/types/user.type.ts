import { UserEntity } from "src/modules/user/user.entity";

export type UserType = Omit<UserEntity, 'hashPassword'>;