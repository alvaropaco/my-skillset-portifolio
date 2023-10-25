import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from 'typeorm';
  import { ObjectType, Field, ID } from '@nestjs/graphql';
  
  @ObjectType()
  @Entity()
  export class Todo extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    title: string;
  
    @Field()
    @Column({ type: 'boolean', default: false })
    isCompleted: boolean;
  }
  