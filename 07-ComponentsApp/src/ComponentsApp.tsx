import { ThemeProvider } from './presentation/context/ThemeContext'
import { Navigation } from './presentation/navigator/Navigation'



export const ComponentsApp = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  )
}
