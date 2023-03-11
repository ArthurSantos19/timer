import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form'
import { CountdownButton, CoutdownContainer, HomeContainer, Separator, StopCountdownButton } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TypeOf } from "zod";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";


interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'Valor max é 60 min')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm


  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }))
  }

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
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }))
    setActiveCycleId(null)
  }

  // const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
  // const minutesAmount = Math.floor(currentSeconds / 60)
  // const secondsAmount = currentSeconds % 60

  // const minutes = String(minutesAmount).padStart(2, '0')
  // const seconds = String(secondsAmount).padStart(2, '0')

  // useEffect(() => {
  //   document.title = `${minutes}:${seconds}`
  // }, [minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

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
