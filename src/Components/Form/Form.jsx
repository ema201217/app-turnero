import {
  FormSelect,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import es from "date-fns/locale/es";
import { Options } from "./Options";
import { BsArrowRight } from "react-icons/bs";


export const Form = () => {
  const [daysSelected, setDaysSelected] = useState([]);
  const [daysSaved, setDaysSaved] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [info, setInfo] = useState([]);

  /*   const setDaysDisabled = dispatch((el)=>SET_DAY(el)); */
  useEffect(() => {
    setDaysSaved(JSON.parse(localStorage.getItem("daysSaved")) || daysSaved);
  }, []);
  /* Al cargar el componente obtenemos lo que esta almacenado en el local storage sino no un array vació */

  useEffect(() => {
    fetch("https://static.healthforcego.com/grades.json")
      .then((res) => res.json())
      .then((result) => setInfo(result.grades));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   await setDaysSaved(daysSelected);
   await localStorage.setItem("daysSaved",JSON.stringify(daysSaved));
  };

  const handleRanges = ({target}) => {
    setRanges({
      ...ranges,
      [target.name] : target.value
  })
  }

  return (
    <Container>
      <Row>
        <form
          onSubmit={handleSubmit}
          className="col-6 d-flex flex-column gap-3"
        >
          <Col className="d-flex flex-row gap-2">
            <FormLabel className="text-primary fs-3">
              Book from Scratch
            </FormLabel>
            <Button>Re-Book Staff</Button>
          </Col>

          <FormSelect className="col-12">
            <Options data={info} />
          </FormSelect>

          <Col className="d-flex flex-row align-items-center gap-2">
            <FormControl
              name="timeIn"
              type="time"
              onChange={handleRanges}
              className="col"
            />
            <BsArrowRight size={20} />
            <FormControl
              name="timeEnd"
              type="time"
              onChange={handleRanges}
              className="col"
            />
          </Col>

          <Col className="d-flex flex-row gap-1">
            <FormCheck />
            <FormLabel>Been Before</FormLabel>
          </Col>

          <Button className="btn-light">
            Edit Default Settings (2 modified)
          </Button>

          <DayPicker
            locale={es}
            mode="multiple"
            max={10}
            selected={daysSelected}
            onSelect={setDaysSelected}
            disabled={daysSaved}
          />

          <Button type="submit">CREATE BOOKINGS</Button>
        </form>
      </Row>
    </Container>
  );
};
