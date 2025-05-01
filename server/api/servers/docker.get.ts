import Dockerode from "dockerode";
import { Writable } from 'stream';

export default defineEventHandler(async (event) => {
    const docker = new Dockerode({ protocol: 'http', host: 'localhost', port: 2375 });

    
    const container = await docker.createContainer({
    Image: "orecrunch/mc-univesal:latest",
    HostConfig: {
        PortBindings: {
          "25565/tcp": [{ HostPort: "25565" }],
          "25565/udp": [{ HostPort: "25565" }]
        },

      },
      ExposedPorts: {
        "25565/tcp": {},
        "25565/udp": {}
      }, 
      Env: [
        'MINECRAFT_VERSION=1.12.2'
    ],

    name: "minecraft_server",
    AttachStderr: true,
    AttachStdin: true,
    AttachStdout: true,
    OpenStdin: true,
    StdinOnce: true,
    Tty: false
   })

   const stream = await container.attach({
    hijack: true,
    stderr: true,
    stdin: true,
    stdout: true,
    stream: true
   })

   stream.on("data", (data) => {
   
    const response = data.slice(8).toString();
    console.log(response);
   })



   await container.start();
    
    //return eventStream.send();
    return {}
});
