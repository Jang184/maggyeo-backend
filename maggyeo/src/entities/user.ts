import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import PresentList from './presentList';

@Entity("USER")
export default class User {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
    id: number;

    @Column({
        name: "NAME",
        type: "varchar",
        length: 10,
        nullable: false
    })
    name: string;

    @Column({
        name: "EMAIL",
        type: "varchar",
        length: 20,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        name: "PASSWORD",
        type: "varchar",
        length: 100,
        nullable: false
    })
    password: string;

    @Column({
        name: "PROFILE_URL",
        type: "varchar",
        length: 500,
        nullable: true
    })
    profileUrl: string;

    @OneToMany(
        _=> PresentList,
        present => present.user,
        { cascade: ["insert", "update"]}
    )
    presents: PresentList[];

    @CreateDateColumn({
        name: "CREATED_AT"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT"
    })
    updatedAt: Date;
}

