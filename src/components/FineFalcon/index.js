import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "../Header";
import Planets from "../Planets";
import Vehicals from "../Vehicals";

import { loadPlanets, loadVehicals } from "../../store/findFalcone";
import { MainContainer, Footer, ReferenceLink } from "./styledComponents";

const FindFalcone = () => {
  const plantesData = useSelector(
    (store) => store.entities.findFalcone.planetsData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlanets());
    dispatch(loadVehicals());
  });
  return (
    <>
      <Header />
      <MainContainer>
        <Planets />
        <Vehicals />
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

export default FindFalcone;
