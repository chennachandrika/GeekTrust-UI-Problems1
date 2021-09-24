import { RadioWrapper, RadioButton, Label } from "./styledComponents";

const Vehicals = (props) => {
  const { vehicalsData, id } = props;

  return (
    <>
      {vehicalsData &&
        vehicalsData.map((vehical, index) => (
          <RadioWrapper key={`vehical ${vehical.name} ${index}`}>
            <RadioButton type="radio" name={id} />
            <Label htmlFor={id}>
              {vehical.name} ({vehical.total_no})
            </Label>
          </RadioWrapper>
        ))}
    </>
  );
};

export default Vehicals;
