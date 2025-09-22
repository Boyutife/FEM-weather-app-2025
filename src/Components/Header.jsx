import Logo from "./Logo";
import UnitNav from "./UnitNav";

const Header = ({ units, setUnits, isMetric, setIsMetric }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Logo />
      <UnitNav
        units={units}
        setUnits={setUnits}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
      />
    </div>
  );
};

export default Header;
