import Dockerode from "dockerode";

export function useDocker() {
    return new Dockerode({ protocol: 'http', host: 'localhost', port: 2375 });
}