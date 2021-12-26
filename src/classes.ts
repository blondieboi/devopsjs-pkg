import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { displayLogo, stepExecutionWrapper } from './utilities/runner'

class Pipeline {
    uuid: string
    name: string
    description: string
    stepGroups: StepGroup[]

    constructor(
        name: string,
        description: string,
        stepGroups: StepGroup[] = []
    ) {
        this.uuid = uuidv4()
        this.name = name
        this.description = description
        this.stepGroups = stepGroups
    }

    addStepGroups(stepGroups: StepGroup[]) {
        this.stepGroups.push(...stepGroups)
    }

    run() {
        displayLogo()
        for (let stepGroups of this.stepGroups) {
            stepGroups.run()
        }
    }

    generateDefinition() {
        fs.writeFileSync('pipeline.json', JSON.stringify(this))
    }
}

class Unit {
    uuid: string
    name: string
    description: string

    constructor(name: string, description: string) {
        this.uuid = uuidv4()
        this.name = name
        this.description = description
    }

    displayHeader() {
        console.log(`
#######################################################################################
uuid:           ${this.uuid}
name:           ${this.name}
description:    ${this.description}
time:           ${new Date()}
#######################################################################################
        `)
    }
}

class StepGroup extends Unit {
    steps: Step[]

    constructor(name: string, description: string, steps: Step[] = []) {
        super(name, description)
        this.steps = steps
    }

    addSteps(steps: Step[]) {
        this.steps.push(...steps)
    }

    run() {
        for (let step of this.steps) {
            step.run()
        }
    }
}

class Step extends Unit {
    step: () => void

    constructor(name: string, description: string, step: () => void) {
        super(name, description)
        this.step = step
    }

    run() {
        stepExecutionWrapper(this)
    }
}

export { Pipeline, Step, StepGroup }
