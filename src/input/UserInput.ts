export enum UserInput {
    NUM_1 = 'Digit1,Numpad1',
    NUM_2 = 'Digit2,Numpad2',
    NUM_3 = 'Digit3,Numpad3',
    NUM_4 = 'Digit4,Numpad4',
    NUM_5 = 'Digit5,Numpad5',
    NUM_6 = 'Digit6,Numpad6',
    NUM_7 = 'Digit7,Numpad7',
    NUM_8 = 'Digit8,Numpad8',
    NUM_9 = 'Digit9,Numpad9',

    ALTERNATE_ANNOTATION_MODE = 'KeyP,KeyN',
    DELETE = 'Escape,Delete,Backspace'
}

export const mapInputToNumber = (input: UserInput): number | undefined => {
    switch (input) {
        case UserInput.NUM_1: return 1
        case UserInput.NUM_2: return 2
        case UserInput.NUM_3: return 3
        case UserInput.NUM_4: return 4
        case UserInput.NUM_5: return 5
        case UserInput.NUM_6: return 6
        case UserInput.NUM_7: return 7
        case UserInput.NUM_8: return 8
        case UserInput.NUM_9: return 9
    }

    return undefined
}

const userInputs = Object.values(UserInput)
    .filter((key) => isNaN(Number(key)))

export const mapKeyToUserInput = (keyCode: string): UserInput | undefined => {
    const upperKeyCode = keyCode.toUpperCase()
    const input = userInputs.find(input => input.toUpperCase().split(',').includes(upperKeyCode))
    if (!input) {
        console.log('Unmapped keyCode: ' + keyCode)
    }
    return input
}
