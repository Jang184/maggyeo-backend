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

@Entity("PARTICIPATE")
export default class Participate {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
    id: number;

    @Column({
        name: "MESSAGE",
        type: "nvarchar",
        length: 500,
        nullable: false
    })
    message: string;

    @ManyToOne(_=> User)
    @JoinColumn({ name: "PARTICIPANT_ID" })
    participant: User;
    
    @ManyToOne(_=> PresentList)
    @JoinColumn({ name: "LIST_ID" })
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

