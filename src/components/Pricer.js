import React, { useState } from 'react';

import styled from 'styled-components';


const syntheticClaims = [
    ["Inpatient",12,"$500"],
    ["Inpatient",101,"$5000"],
    ["Outpatient",2,"$400"],
    ["Outpatient",209,"$40000"],
    ["Hybrid",9,"$300"],
    ["Hybrid",101,"$3000"],
    ["Telehealth",33,"$300"],
    ["Telehealth",170,"$3000"],
]
var treatmentTypes = Array.from(
    new Set(syntheticClaims.map((claim) => claim[0])));

// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;
const StyledDiv = styled.div`
  display: flex;
`;
const StyledP = styled.p`
  margin: 10px;
`;

// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

const getDefaultCheckboxes = () =>
  treatmentTypes.map(checkbox => ({
    name: checkbox,
    checked: false,
  }));
export function useCheckboxes(defaultCheckboxes) {
  const [checkboxes, setCheckboxes] = useState(
    defaultCheckboxes || getDefaultCheckboxes(),
  );
  function setCheckbox(index, checked) {
    const newCheckboxes = [...checkboxes];
    newCheckboxes.forEach(function(part, index, newCheckboxes) {
      newCheckboxes[index].checked = false;
    });
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);
  }
  return {
    setCheckbox,
    checkboxes,
  };
}
const Checkbox = styled.input`
  margin: 0px 10px 0px !important;
  cursor: pointer;
`;
const CheckboxLabel = styled.label`
  cursor: pointer;
  display: block;
  font-weight: normal;
`;
export function Checkboxes({ checkboxes, setCheckbox }) {
  return (
    <>
    <StyledDiv>
      {checkboxes.map((checkbox, i) => (
        <CheckboxLabel>
          <Checkbox
            type="radio"
            checked={checkbox.checked}
            onChange={e => {
              setCheckbox(i, e.target.checked);
            }}
          />
          {checkbox.name}
        </CheckboxLabel>
      ))}
    </StyledDiv>
    </>
  );
}

function getPriceEstimate(caseType, duration) {
  if (treatmentTypes.includes(caseType)) {
    var parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration)) {
      return "Enter a valid duration of hours.";
    }
    var claimsForCaseType = syntheticClaims.filter(function (c) {
      return c[0] === caseType;
    });

    var higherClaim = [];
    var lowerClaim = [];
    for (let i = 0; i < claimsForCaseType.length; i++) {
      console.log(lowerClaim);
      console.log(claimsForCaseType[i][1]);
      if ((lowerClaim.length === 0 &&
           claimsForCaseType[i][1] < parsedDuration) ||
          (lowerClaim.length > 0 && lowerClaim[2] < claimsForCaseType[i][2] &&
           claimsForCaseType[i][1] < parsedDuration)) {
        lowerClaim = claimsForCaseType[i];
      }
      if ((higherClaim.length === 0 &&
           claimsForCaseType[i][1] > parsedDuration) ||
          (higherClaim.length > 0 && higherClaim[2] > claimsForCaseType[i][2] &&
           claimsForCaseType[i][1] > parsedDuration)) {
        higherClaim = claimsForCaseType[i];
      }
    }
    if (lowerClaim.length > 0 &&
        higherClaim.length > 0) {
      return ("Based on our dataset, your price is between (" +
        lowerClaim[2] + "/" + lowerClaim[1] + " Hours) and (" +
        higherClaim[2] + "/" + higherClaim[1] + " Hours)");
    }
    if (higherClaim.length > 0) {
      return ("Based on our dataset, your price is below (" +
        higherClaim[2] + "/" + higherClaim[1] + " Hours)");
    }
    if (lowerClaim.length > 0) {
      return ("Based on our dataset, your price is above (" +
        lowerClaim[2] + "/" + lowerClaim[1] + " Hours)");
    }
    return "Could not find price estimate."
    //return [claimsForCaseType.join(".")].join(", ");
  } else {
    return "Select a case type.";
  }
}

export function PriceDisplay({ caseType, duration }) {
  return (
    <div>
      <StyledDiv>
      <StyledP>
      <span>
        Case Type: {caseType}
      </span>
      </StyledP>
      <StyledP>
      <span>
        Treatment Length: {duration || 0} Hours
      </span>
      </StyledP>
      </StyledDiv>
      <p>
      <span>
        Estimated Price: <p>{getPriceEstimate(caseType, duration)}</p>
      </span>
      </p>
    </div>
  );
}

// Usage in Pricer
function Pricer(props) {
  const inputProps = useInput();
  const checkboxes = useCheckboxes();
  return (
    <div>
      <Checkboxes {...checkboxes} />
      <StyledInput
        {...inputProps}
        placeholder="Length of Stay"
      />
      <PriceDisplay
        caseType={checkboxes.checkboxes
          .filter(t => t.checked)
          .map(checkbox => checkbox.name)
          .join(', ')}
        duration={inputProps.value} />
    </div>
  );
}

export default Pricer;
