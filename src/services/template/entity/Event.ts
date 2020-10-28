import { Field, Int } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';


@Entity()
export class Event extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    description: string;

    @Field()
    @Column("text")
    videoChatLink: string;

    @OneToMany(()=>User, user => user.ownedEvents)
    owner: User;

    @ManyToMany(()=>User, user => user.events)
    participants: User[];
}