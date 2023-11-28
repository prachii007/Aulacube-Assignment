import { legacy_createStore as createStore } from "redux";
import MainReducer from "./reducers/mainReducer";

const Mystore = createStore(MainReducer);
export default Mystore;