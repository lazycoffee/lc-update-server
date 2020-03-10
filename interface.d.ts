import { ConnectConfig } from "ssh2";

export interface Config {
    server: ConnectConfig,
    upload: {
        localPath: string;
        fileRex: RegExp;
        cleanPath: string;
        remotePath: string;
    }
}