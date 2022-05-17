import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";

import User from "./user";
import PresentDetail from "./presentDetail";

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

    @Column({
        name: "CANCELED",
        type: "boolean",
        default: false
    })
    canceled: boolean;

    @ManyToOne((_) => User)
    @JoinColumn({ name: "USER_ID" })
    user: User;

    @ManyToOne((_) => PresentDetail)
    @JoinColumn({ name: "DETAIL_ID" })
    presentDetail: PresentDetail;

    @CreateDateColumn({
        name: "CREATED_AT"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT"
    })
    updatedAt: Date;
}
