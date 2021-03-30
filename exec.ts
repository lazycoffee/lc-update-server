import ssh, { ConnectConfig, Connection } from 'ssh2';
const SshClient = ssh.Client;
const connect = function(sshOption: ConnectConfig){
    return new Promise(resolve=>{
        const connection = new SshClient();
        connection.on('ready',()=>{
            console.log('exec ssh ready.');
            resolve(connection);
        }).connect(sshOption);

    });
}
const exec = function(connection: Connection, command: string){
    return new Promise((resolve)=>{
        (connection as any).exec(command, (error: Error, stream: any)=>{
            stream.on('close', function(code: string, signal: string) {
                console.log('Stream :: code: ' + code + ', signal: ' + signal);
                resolve(null);
              }).on('data', function(data: string) {
                console.log('STDOUT: ' + data);
              }).stderr.on('data', function(data: string) {
                console.log('STDERR: ' + data);
              });
        });
    });
}
const run = function(sshOption: ConnectConfig, commands: string[]){
    return new Promise(async (resolve)=>{
        const connection: any = await connect(sshOption);
        let allCommand = commands.join(' && ');
        await exec(connection, allCommand);
        connection.end();
    });
}
export default run;