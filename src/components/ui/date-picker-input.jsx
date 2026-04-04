"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function formatDate(date) {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function toIsoDateString(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DatePickerInput({ label, value, onChange, placeholder }) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = value ? new Date(value) : undefined;
  const [month, setMonth] = React.useState(selectedDate);
  const [inputValue, setInputValue] = React.useState(formatDate(selectedDate));

  React.useEffect(() => {
    setInputValue(formatDate(selectedDate));
    setMonth(selectedDate);
  }, [value]);

  return (
    <Field className="w-full">
      {label && <FieldLabel>{label}</FieldLabel>}
      <InputGroup>
        <InputGroupInput
          value={inputValue}
          placeholder={placeholder}
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            const nextText = e.target.value;
            setInputValue(nextText);
            const parsed = new Date(nextText);
            if (isValidDate(parsed)) {
              onChange?.(toIsoDateString(parsed));
              setMonth(parsed);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-3"
              align="end"
              side="top"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  if (date) {
                    onChange?.(toIsoDateString(date));
                    setInputValue(formatDate(date));
                  } else {
                    onChange?.("");
                    setInputValue("");
                  }
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
