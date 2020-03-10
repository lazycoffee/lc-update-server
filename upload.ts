import path from 'path';
import domain from "domain";
import SSH, { ConnectConfig } from "ssh2";
import Connection = SSH.Client;

function uploadToSftpServer(options: ConnectConfig, localPath:string, remotePath:string) {
    if(!localPath){
        throw new Error('You have to provide local file path.');
    }
    if(!remotePath){
        throw new Error('You have to provide remote directory path.');
    }
    return new Promise(resolve=>{
        let realRemotePath = remotePath;
        if(!path.extname(remotePath)){
            realRemotePath = path.join(remotePath, path.basename(localPath));
        }
        const connection = new Connection(),
        handler = domain.create();
        handler.on("error", function (error) {
            console.error("Error occurred: %s", error);
            process.exit(-1);
        });

        // Handling "error" event inside domain handler.
        handler.add(connection);

        connection.on("ready", function () {
            connection.sftp(handler.intercept(function (sftp: any) {
                sftp.fastPut(
                    localPath,
                    realRemotePath,
                    handler.intercept(connection.end.bind(connection))
                );
            }));
        });

        connection.on("end", function(){
            console.log(`upload finished: ${localPath}->${realRemotePath}`);
            resolve(true);
        });
        connection.connect(options);
    });
}
export default uploadToSftpServer;
