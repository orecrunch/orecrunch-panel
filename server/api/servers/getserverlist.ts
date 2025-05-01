export default defineEventHandler(async (event) => {

  const docker = useDocker();

  const containters = await docker.listContainers({
    "all": true,
  });


  return containters
})
