import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private client;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getClient(): Client;
}
