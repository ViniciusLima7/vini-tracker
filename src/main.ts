import { createApp } from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import routes from "./routes";

createApp(App).use(routes).mount("#app");
