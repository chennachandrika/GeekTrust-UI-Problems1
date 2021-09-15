import FindFalcone from "./components/FineFalcon";
import { AppContainer } from "./styledComponents";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <FindFalcone />
      </AppContainer>
    </Provider>
  );
}
