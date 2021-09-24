import { useDispatch } from "react-redux";
import { planetSelected } from "../../store/findFalcone";
import Vehicals from "../Vehicals";
import { useState } from "react";
import { Item, CustomSelect, Option } from "./styledComponents";

const Planets = (props) => {
  const { planetsInfo, vehicalsInfo, id } = props;
  const [selectedPlanet, setPlanet] = useState(null);

  const dispatch = useDispatch();
  const onChangePlanet = (event) => {
    setPlanet(event.target.value);
    dispatch(planetSelected({ id, selectedPlanet: event.target.value }));
  };
  return (
    <Item>
      <CustomSelect onChange={onChangePlanet}>
        <Option disabled={selectedPlanet}>Select</Option>
        {planetsInfo.map((planet) => (
          <Option key={planet.name} value={planet.name}>
            {planet.name}
          </Option>
        ))}
      </CustomSelect>
      {vehicalsInfo && <Vehicals id={id} vehicalsData={vehicalsInfo} />}
    </Item>
  );
};

export default Planets;
