import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "components/Button";
import Select, { Option } from "components/Select";
import { ReactComponent as IconPlus } from "assets/plus.svg";
import { ReactComponent as IconMinus } from "assets/minus.svg";
import {
  StoreStateType,
  RoomType,
  addChild,
  removeChild,
  removeSpecificChild,
  changeChildAge,
} from "store";

import {
  Guest,
  GuestText,
  GuestButtonGroup,
  KidsContainer,
  IconRemoveChild,
} from "../../styles";

type GuestsRoomChildrenProps = {
  position: number;
};

const GuestsRoomChildren = ({
  position,
}: GuestsRoomChildrenProps): ReactElement => {
  const dispatch = useDispatch();
  const {
    children,
    maxNumberOfChildren,
    maxOccupancy,
    totalGuests,
  }: RoomType = useSelector((state: StoreStateType) => state.rooms[position]);
  const isRemoveButtonDisabled = children.length === 0;
  const isAddButtonDisabled =
    children.length === maxNumberOfChildren || totalGuests === maxOccupancy;

  return (
    <>
      <Guest>
        <GuestText>Children</GuestText>
        <GuestButtonGroup>
          <Button
            onClick={() => dispatch(removeChild(position))}
            theme="secondary"
            dataTestId={`remove-child-${position}-button`}
            disabled={isRemoveButtonDisabled}
          >
            <IconMinus />
          </Button>
          <GuestText data-testid="children-counter">
            {children.length}
          </GuestText>
          <Button
            onClick={() => dispatch(addChild(position))}
            theme="secondary"
            dataTestId={`add-child-${position}-button`}
            disabled={isAddButtonDisabled}
          >
            <IconPlus />
          </Button>
        </GuestButtonGroup>
      </Guest>
      <KidsContainer>
        {children.map((child, index) => (
          <Guest key={`child-${index}-${position}`}>
            <GuestText>Child {index + 1} age</GuestText>
            <GuestButtonGroup>
              <Select
                dataTestId={`child-${index}-${position}-select`}
                value={String(child.age)}
                onChange={(event) =>
                  dispatch(
                    changeChildAge({
                      childrenPosition: index,
                      roomPosition: position,
                      age: event.target.value,
                    })
                  )
                }
              >
                <Option value="">Age</Option>
                {[
                  ...Array.from(Array(17).keys()).map((age) => (
                    <Option
                      key={`child-age-${age}-${position}-option`}
                      value={String(age)}
                    >
                      {age}
                    </Option>
                  )),
                ]}
              </Select>
              <IconRemoveChild
                data-testid={`remove-child-${index}-${position}-icon`}
                onClick={() =>
                  dispatch(
                    removeSpecificChild({
                      childrenPosition: index,
                      roomPosition: position,
                    })
                  )
                }
              />
            </GuestButtonGroup>
          </Guest>
        ))}
      </KidsContainer>
    </>
  );
};

export default GuestsRoomChildren;
