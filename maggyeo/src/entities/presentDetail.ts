import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import presentList from './presentList';

@Entity("PRESENT_DETAIL")
export default class PresentDetail {
    @PrimaryGeneratedColumn({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
    id: number;

    @Column({
        name: "URL",
        type: "varchar",
        length: 500,
        nullable: false
    })
    url: string;

    @ManyToOne(
        _=> presentList
    )
    @JoinColumn({ name: "PRESENT_LIST" })
    presentList: presentList

    @CreateDateColumn({
        name: "CREATED_AT"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "UPDATED_AT"
    })
    updatedAt: Date;
}

