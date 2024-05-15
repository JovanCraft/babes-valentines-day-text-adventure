const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");



let state = {}


function startGame() {
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)

}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if(nextTextNodeId <= 0){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange world with a black rabbit staring at you in front of a pathway",
        options:[
            {
                text: "Take the rabbit and walk down the path",
                setState: { createOne: true },
                nextText: 2
            },
            {
                text: "Leave the rabbit and walk down the path",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a hungry merchant.',
    options: [
      {
        text: 'Trade the rabbit for a gun',
        requiredState: (currentState) => currentState.createOne,
        setState: { createOne: false, gun: true },
        nextText: 3
      },
      {
        text: 'Trade the rabbit for a purse',
        requiredState: (currentState) => currentState.createOne,
        setState: { createOne: false, purse: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'OOPS TRY AGAIN!',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell for all eternity.',
    options: [
      {
        text: 'OOPS TRY AGAIN!',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Shoot at it with your gun',
        requiredState: (currentState) => currentState.gun,
        nextText: 9
      },
      {
        text: 'Hide behind your purse',
        requiredState: (currentState) => currentState.purse,
        nextText: 10
      },
      {
        text: 'Ask the rabbit to help you',
        requiredState: (currentState) => currentState.createOne,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches you and eats you.',
    options: [
      {
        text: 'OOPS TRY AGAIN!',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with bullets...He gobbles you up within seconds.',
    options: [
      {
        text: 'OOPS TRY AGAIN!',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your purse and ate you.',
    options: [
      {
        text: 'OOPS TRY AGAIN!',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'The rabbit jumps up and transforms into JoJo, who uses his incredible strength to slay the monster and opens a portal back to your world. You and JoJo go and live happily ever after! The End!!',
    options: [
      {
        text: 'CONGRATULATIONS!! Play Again??',
        nextText: -1
      }
    ]
  }
]



startGame();
