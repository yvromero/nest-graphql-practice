import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Tervetuloa', name: 'Terve'})
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query( () => Float, { name: 'randomNumber' } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    // @Query( () => Int, { name: 'randomFromZeroTo' } )
    // getRandomFromZeroTo(): number {
    //     return Math.floor(Math.random() * 10 );
    // }

    // Args
    @Query( () => Int, { name: 'randomFromZeroTo', description: 'From Zero to argument TO (default 6)' } )
    getRandomFromZeroTo( 
        @Args('to', { type: () => Int, nullable: true } ) to: number = 6
    ): number {
        return Math.floor(Math.random() * to );
    }
}
