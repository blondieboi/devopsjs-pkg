import { Step } from '../classes'
import { logRuntime } from './logging'

const version = 'v1.0.0'

function displayLogo() {
    console.log(`
#######################################################################################

            _\\                 
            / b                     DONKEY DEVOPS
        /####J                          ${version}
        |\\ ||

#######################################################################################  
    `)
}

function stepExecutionWrapper(step: Step) {
    const startTime = new Date()
    step.displayHeader()
    step.step()
    const endTime = new Date()
    logRuntime(
        `Execution took ${
            endTime.getMilliseconds() - startTime.getMilliseconds()
        }ms`
    )
}

export { stepExecutionWrapper, displayLogo }
