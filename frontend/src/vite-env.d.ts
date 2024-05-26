/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_WEBSOCKET_HOST: string;
    readonly VITE_WEBSOCKET_PORT: string;
    readonly VITE_SERVER_HOST: string;
    readonly VITE_SERVER_PORT: string;
    readonly VITE_WEBSOCKET:string
    readonly VITE_SERVER:string
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
}
