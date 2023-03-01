import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { CountdownButton, CoutdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StopCountdownButton, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TypeOf } from "zod";
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'Valor max é 60 min')
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }

  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondPassed(0)

    reset();
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }))
    setActiveCycleId(null)
  }


  console.log(activeCycle)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = `${minutes}:${seconds}`
  }, [minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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


        <CoutdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CoutdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <CountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
