"use client"

import { FC, useState } from "react"
import { format, setDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Control, Controller, UseFormRegister } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field } from "../types"

export const DateTimeField: FC<{
  field: Field<any>
  id: string
  control: Control<any, any>
}> = ({ field, id, control }) => {
  return (
    <Controller
      defaultValue={(field.initialValue || field.defaultValue || null) as any}
      control={control}
      name={field.name}
      render={({ field: { onChange, onBlur, value, ref, name } }) => (
        <>
          {" "}
          <DatePicker value={value} onChange={(e) => onChange(e)} /> à
          <Select>
            <SelectTrigger>
              <SelectValue>jo</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Aucun</SelectItem>
              <SelectItem value={"1"}>1</SelectItem>
              <SelectItem value={"2"}>2</SelectItem>
              <SelectItem value={"3"}>3</SelectItem>
              <SelectItem value={"4"}>4</SelectItem>
              <SelectItem value={"5"}>5</SelectItem>
              <SelectItem value={"6"}>6</SelectItem>
              <SelectItem value={"7"}>7</SelectItem>
              <SelectItem value={"8"}>8</SelectItem>
              <SelectItem value={"9"}>9</SelectItem>
              <SelectItem value={"10"}>10</SelectItem>
              <SelectItem value={"11"}>11</SelectItem>
              <SelectItem value={"12"}>12</SelectItem>
              <SelectItem value={"13"}>13</SelectItem>
              <SelectItem value={"14"}>14</SelectItem>
              <SelectItem value={"15"}>15</SelectItem>
              <SelectItem value={"16"}>16</SelectItem>
              <SelectItem value={"17"}>17</SelectItem>
              <SelectItem value={"18"}>18</SelectItem>
              <SelectItem value={"19"}>19</SelectItem>
              <SelectItem value={"20"}>20</SelectItem>
              <SelectItem value={"21"}>21</SelectItem>
              <SelectItem value={"22"}>22</SelectItem>
              <SelectItem value={"23"}>23</SelectItem>
            </SelectContent>
          </Select>
          h
          <Select>
            <SelectTrigger>
              <SelectValue>00</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Aucun</SelectItem>
              <SelectItem value={"00"}>00</SelectItem>
              <SelectItem value={"15"}>15</SelectItem>
              <SelectItem value={"30"}>30</SelectItem>
              <SelectItem value={"45"}>45</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    />
  )
}

const DatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
