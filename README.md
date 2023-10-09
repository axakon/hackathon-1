# Hackathon 1, October 11th

## Setup

1. Create `.env` file and add Open AI api key, ask someone in the knowledge team for a key.
```OPEN_AI_API_KEY=<key>```
2. Install dependencies with `npm i`
3. Create file `prompt.txt` Add your prompt to it.
4. Run `npm run prompt` which will output the result to `./public/index.html`
5. Open `./publix/index.html` or run `npm run game`

## Challenge
Generate Tic Tac Toe game using the AI engine that we provide. The code must be in Pure JS + HTML 5. The idea of the challenge is to get people somewhat familiarized with prompting and generating code via a large language model. To make this challenge harder than you think, we have come up with the following constraints:
- You are not allowed to modify the engine script AT ALL.
- You are PROHIBITED from using the following keywords in your prompt: "Tic Tac Toe".
- You are not allowed to send code in the prompt, this includes the code you receive from the engine.
- You are not allowed to modify code in anyway, you must get it to work EXCLUSIVELY by prompting the AI.
- The code cannot contain any libs.
- All code must be contained in a single file.

To complete this challenge we want you to achieve the following:
- Get fully functional game working in your browser prompting the AI throughout. The game is ONLY Player vs Player, no Player vs CPU needed.

For the game to be considered valid it must fulfill the following criteria:
- 3x3 grid
- Clickable squares
- Win and lose conditions
- Using AXA and KON as the grid symbols
- Showing winner as part of an Alert()
- On alert dismiss restart game

If you complete the previous challenge before the end of the session, we recommend embarking on these extra challenges:
- Adding your own "spice" to the game. Something like CSS animations...etc.

If you really wanna go crazy, try adding the Minimax algorithm to your game to allow EXTREME COMPETITIVE mode vs PC.