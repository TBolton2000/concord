import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity("interviews")
export class Interview extends BaseEntity {
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

    @Field(() => [User])
    @Column('text', {default : 0})
    @ManyToOne(() => User, (user) => user.ownedInterviews)
    owner: User;

    @Field(() => [User])
    @Column('text', {default : null})
    @ManyToMany(()=>User, user => user.intervsInterviews)
    interviewers: User[];

    @Field(() => [User])
    @Column('text', {default : null})
    @ManyToMany(()=>User, user => user.candsInterviews)
    candidates: User[];

 
}