import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import User from './user';
import PresentList from './presentList';

@Entity("MEMBER")
export default class Member {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
    id: number;

    @Column({
        name: "MESSAGE",
        type: "varchar",
        length: 500,
        nullable: false
    })
    message: string;

    @ManyToOne(_=> User)
    @JoinColumn({ name: "USER_ID" })
    user: User;
    
    @ManyToOne(_=> PresentList)
    @JoinColumn({ name: "PRESENT_ID" })
    presentList: PresentList

    @CreateDateColumn({
        name: "CREATED_AT"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT"
    })
    updatedAt: Date;
}

