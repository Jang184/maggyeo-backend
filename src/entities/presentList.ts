import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import User from "./user";
import PresentDetail from "./presentDetail";

@Entity("PRESENT_LIST")
export default class PresentList {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true,
    })
    id: number;

    @Column({
        name: "NAME",
        type: "nvarchar",
        length: 200,
        nullable: false,
    })
    name: string;

    @Column({
        name: "DESCRIPTION",
        type: "varchar",
        length: 500,
        nullable: true,
    })
    description: string;

    @ManyToOne((_) => User)
    @JoinColumn({ name: "USER_ID" })
    user: User;

    @OneToMany(
        (_) => PresentDetail,
        (presentDetail) => presentDetail.presentList,
        { cascade: ["insert", "update"] }
    )
    presentDetails: PresentDetail[];

    @CreateDateColumn({
        name: "CREATED_AT",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT",
    })
    updatedAt: Date;
}
