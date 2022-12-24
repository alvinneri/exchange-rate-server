import app from "./app";

try {
  app.listen(9000, (): void => {
    console.log(`Connected successfully on port 9000`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
