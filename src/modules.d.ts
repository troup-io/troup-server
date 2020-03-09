declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'simulation' | 'production';
        APP_SECRET: string;
    }
}
