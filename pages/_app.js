import "tailwindcss/tailwind.css";
import { createServer } from "miragejs";
import faker from "faker";
import { SWRConfig } from "swr";
faker.seed(123);

let isBrowser = typeof window !== "undefined";
let users = [...Array(50).keys()]
  .map((i) => ({
    id: i,
    name: faker.name.firstName(),
  }))
  .sort((a, b) => (a.name > b.name ? 1 : -1));

let server;
if (isBrowser && !server) {
  server = createServer({
    routes() {
      this.get("/api/users", () => users);

      // Don't log passthrough
      this.pretender.passthroughRequest = () => {};
    },
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
