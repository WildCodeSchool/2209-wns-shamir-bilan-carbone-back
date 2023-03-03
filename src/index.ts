import createServer from "./tools/server";

const port = 5002;

const start = async (): Promise<void> => {
  const server = await createServer();
  try {
    const { url }: { url: string } = await server.listen({ port });
<<<<<<< HEAD
    console.log(`server ready at ${url}`);
  } catch (e) {
    console.error("Error while starting the server");
=======
    console.log(`server ready at port ${url}`);
  } catch (e) {
    console.error("Error starting the server");
>>>>>>> 19cf02bfeafce979ba3f4b9748043d1bd14ec38c
  }
};

void start();
