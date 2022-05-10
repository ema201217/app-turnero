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
  const [daysDisabled, setDaysDisabled] = useState([]);
  const [rangeTimeIn, setRangeTimeIn] = useState("");
  const [rangeTimeEnd, setRangeTimeEnd] = useState("");
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    setDaysDisabled(JSON.parse(localStorage.getItem("daysDisabled")) || []);
    setRanges(JSON.parse(localStorage.getItem("rangesTimes")) || []);
  }, []);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetch("https://static.healthforcego.com/grades.json")
      .then((res) => res.json())
      .then((result) => setInfo(result.grades));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDaysDisabled(daysSelected);
    setRanges([rangeTimeIn, rangeTimeEnd]);

    localStorage.setItem("daysDisabled", JSON.stringify(daysDisabled));
    localStorage.setItem("rangesTimes", JSON.stringify(ranges));
  };

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
              onChange={(e) => setRangeTimeIn(e.currentTarget.value)}
              className="col"
            />
            <BsArrowRight size={20} />
            <FormControl
              name="timeEnd"
              type="time"
              onChange={(e) => setRangeTimeEnd(e.currentTarget.value)}
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
            disabled={daysDisabled}
          />

          <Button type="submit">CREATE BOOKINGS</Button>
        </form>
      </Row>
    </Container>
  );
};
