import Dockerode from "dockerode";
import { AttachRequestSchema } from "~/utils/serverschema";
import { PassThrough } from "stream";

export default defineEventHandler(async (event) => {

  const query = getQuery(event)

  const { data, error } = AttachRequestSchema.safeParse(query)

  if (error != null || !data) {
    throw createError({
      statusCode: 500,
      statusMessage: "Bad Request",
    })
  }


  const docker = useDocker();
  let container: Dockerode.Container;
  try {
    container = docker.getContainer(data.id)

    if (!container) throw ""
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Bad Request",
      message: "server not found"
    })
  }





  const eventStream = createEventStream(event)

  const stream = await container.attach({
    stdout: true,
    stderr: true,
    stream: true,
  })

  stream.pipe(process.stdout);

  const stdoutStream = new PassThrough();
  const stderrStream = new PassThrough();
  docker.modem.demuxStream(stream, stdoutStream, stderrStream);

  stdoutStream.on("data", (chunk) => {
    console.log("test")
    pushintoevent(chunk.toString());
  })
  stderrStream.on("data", (chunk) => {
    pushintoevent(chunk.toString());
  })

  function pushintoevent(raw_response: string) {
    const response = raw_response.split(/\r\n|\r|\n/);
    response.forEach((e: string) => {
      if (e !== "") {
        eventStream.push(e.trim());
      }

    });
  }

  stream.on('end', () => {
    eventStream.close();
  });


  return eventStream.send()
})



