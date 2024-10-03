import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del Alma', done: false },
        { id: 2, description: 'Piedra del Espacio', done: false },
        { id: 3, description: 'Piedra del Poder', done: false },
        { id: 4, description: 'Piedra del Viento', done: true },
    ];

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( todoItem => todoItem.done === true ).length;
    }

    get pendingTodos() {
        return this.todos.filter( todoItem => todoItem.done === false ).length;
    }

    findAll( statusArgs: StatusArgs ): Todo[] {

        const { status } = statusArgs;
        if ( status !== undefined ) return this.todos.filter( todoItem => todoItem.done === status );

        return this.todos;
    }

    findOne( id: number ): Todo {
        
        const todo = this.todos.find( todoItem => todoItem.id === id );

        if ( !todo ) throw new NotFoundException(`Todo with ${ id } not found`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {

        const todoCreate = new Todo();
        todoCreate.description = createTodoInput.description;
        todoCreate.id = Math.max( ...this.todos.map( todoItem => todoItem.id ), 0 ) + 1

        this.todos.push( todoCreate );

        return todoCreate;
    }

    update( id: number, updateTodoInput: UpdateTodoInput ) {

        const { description, done } = updateTodoInput;

        const todoUpdate = this.findOne( id );

        if ( description ) todoUpdate.description = description;
        if ( done !== undefined ) todoUpdate.done = done;

        this.todos = this.todos.map( todoItem => {
            return ( todoItem.id === id ) ? todoUpdate : todoItem;
        });
        
        return todoUpdate;
    }

    delete( id: number ): Boolean {
        const todoDelete = this.findOne( id );

        this.todos = this.todos.filter( todoItem => todoItem.id !== id );

        return true;
    }
}
