import { Play } from "phosphor-react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { CountdownButton, CoutdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'Valor max é 60 min')
})

export function Home() {

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema)
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para o projeto"
            {...register('task')} />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="">Durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60}  {...register('minutesAmount', { valueAsNumber: true })} />

          <span>minutos</span>
        </FormContainer>


        <CoutdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CoutdownContainer>

        <CountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
