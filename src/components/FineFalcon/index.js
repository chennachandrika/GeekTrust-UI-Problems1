import Header from "../Header";
import Planets from "../Planets";
import Vehicals from "../Vehicals";
import { useSelector, useDispatch } from "react-redux";
import { loadPlanets } from "../../store/planets";
import { MainContainer, Footer, ReferenceLink } from "./styledComponents";

const FindFalcon = () => {
  const plantesData = useSelector((store) => store.entities.planets);
  const dispatch = useDispatch();
  const getThings = () => {
    dispatch(loadPlanets());
  };

  console.log(plantesData);
  return (
    <>
      <Header />
      <MainContainer>
        <Planets />
        <Vehicals />
        <button onClick={getThings}>Get</button>
      </MainContainer>
      <Footer>
        <ReferenceLink href="https://www.geektrust.in/coding-problem/frontend/space">
          Coding Problem :
          https://www.geektrust.in/coding-problem/frontend/space
        </ReferenceLink>
      </Footer>
    </>
  );
};

export default FindFalcon;
