import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from "typeorm";

import presentList from "./presentList";

@Entity("PRESENT_DETAIL")
export default class PresentDetail {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true,
    })
    id: number;

    @Column({
        name: "URL",
        type: "varchar",
        length: 500,
        nullable: false,
    })
    url: string;

    @Column({
        name: "PRICE",
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column({
        name: "DESCRIPTION",
        type: "nvarchar",
        length: 1000,
    })
    description: string;

    @Column({
        name: "COUNT_LIMIT",
        type: "int",
        unsigned: true,
    })
    countLimit: number;

    @Column({
        name: "COUNT_NOW",
        type: "int",
        unsigned: true,
    })
    countNow: number;

    @ManyToOne((_) => presentList)
    @JoinColumn({ name: "PRESENT_LIST" })
    presentList: presentList;

    @CreateDateColumn({
        name: "CREATED_AT",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT",
    })
    updatedAt: Date;
}
