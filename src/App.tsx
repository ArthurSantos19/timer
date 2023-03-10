import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesContextProvider } from './contexts/CycleContext'
import { Router } from './Router'
import { defaultTheme } from './styles/themes/dafault'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>



      </BrowserRouter>
    </ThemeProvider >
  )
}
