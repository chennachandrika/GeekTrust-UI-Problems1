import { useDispatch } from "react-redux";
import { vehicalSelected } from "../../store/findFalcone";
import { RadioWrapper, RadioButton, Label } from "./styledComponents";

const Vehicals = (props) => {
  const { vehicalsData, id } = props;
  const dispatch = useDispatch();
  const onChangeVehical = (event) => {
    dispatch(vehicalSelected({ id: id, selectedVehical: event.target.value }));
  };

  return (
    <>
      {vehicalsData &&
        vehicalsData.map((vehical, index) => (
          <RadioWrapper
            key={`vehical ${vehical.name} ${index}`}
            onChange={onChangeVehical}
          >
            <RadioButton
              type="radio"
              name={`vehical ${index}`}
              value={vehical.name}
            />
            <Label htmlFor={`vehical ${index}`}>
              {vehical.name} ({vehical.total_no})
            </Label>
          </RadioWrapper>
        ))}
    </>
  );
};

export default Vehicals;
