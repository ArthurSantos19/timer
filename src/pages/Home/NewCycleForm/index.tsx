import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { useContext } from "react";
import { CyclesContext } from "..";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()



  // const newCycleFormValidationSchema = zod.object({
  //   task: zod.string().min(1, 'Informe a tarefa'),
  //   minutesAmount: zod.number().min(5).max(60, 'Valor max é 60 min')
  // })

  

  // const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
  //   resolver: zodResolver(newCycleFormValidationSchema),
  //   defaultValues: {
  //     task: '',
  //     minutesAmount: 0,
  //   }
  // })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para o projeto" disabled={!!activeCycle}
        {...register('task')} />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="">Durante</label>
      <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" disabled={!!activeCycle} step={5} min={5} max={60}  {...register('minutesAmount', { valueAsNumber: true })} />

      <span>minutos</span>
    </FormContainer>
  )
}