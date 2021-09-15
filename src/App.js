import FindFalcon from "./components/FineFalcon";
import { AppContainer } from "./styledComponents";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <FindFalcon />
      </AppContainer>
    </Provider>
  );
}
