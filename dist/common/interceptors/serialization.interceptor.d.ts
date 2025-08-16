import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SerializationInterceptor<T> implements NestInterceptor {
    private readonly dtoClass;
    constructor(dtoClass: new (...args: any[]) => T);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export interface SerializationResponse<T> {
    success: boolean;
    data: T | T[] | null;
}
