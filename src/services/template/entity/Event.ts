import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

// import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity("events")
export class Event extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    title: string;

    @Field()
    @Column("timestamp")
    time: string;

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