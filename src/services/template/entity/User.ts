import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Event } from './Event';

@ObjectType()
@Entity("users")
@Unique(["email"])
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    @Length(2, 30, {message: "Name must be at least 2 and at most 30 characters"})
    @IsNotEmpty({message: "Name is required"})
    name: string;

    @Field()
    @Column("text")
    @IsEmail({},{message: "Email is not a valid email address"})
    @IsNotEmpty({message: "Email is required"})
    email: string;

    @Column("text")
    @Length(8, 30, {message: "Password must be at least 8 and at most 30 characters"})
    @IsNotEmpty({message: "Password is required"})
    password: string;

    @Column("int", {default: 0})
    tokenVersion: number;

    @Column("int", {default: 0})
    resetPasswordToken: string;

    @OneToMany(()=>Event, event => event.owner)
    ownedEvents: Event[];

    @ManyToMany(()=>Event, event => event.participants)
    @JoinTable()
    events: Event[];
}