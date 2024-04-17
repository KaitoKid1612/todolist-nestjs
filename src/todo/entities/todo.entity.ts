import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    done: boolean;

   // many todos can belong to one user
    @ManyToOne(() => User, user => user.todos)
    user: User;

}
