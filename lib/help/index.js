const helpCards = () => `You can draw cards with \`!honour draw\` or \`!c\` for short. Valid commands are: \`\`\`
!c                        - draw 1 card
!c <deck>                 - draw 1 card from the deck named <deck>
!c <number>               - draw <number> cards from the channel deck
!c <number> <deck>        - draw <number> cards from the deck named <deck> 
!c shuffle                - shuffle the channel deck
!c shuffle <deck>         - shuffle the deck named <deck>
!c remove <deck>          - remove the deck named <deck> from play
!c list                   - list all decks in play
\`\`\`

A pack is automatically shuffled when the deck is empty.
`


const helpDice = () => `You can roll dice with \`!roll\` or \`!r\` for short.

Dice format is <?number><**type**><?number><?**modifier**><?number> where "number" is any whole number, and ? means optional.

- Ask me for more information about about dice **types** with \`!honour help types\`.
- I support a bunch of **modifiers** for your rolls, keep-the-lowest, keep-the-highest, and more. Ask me for more information with \`!honour help modifiers\`.

Examples:
\`\`\`
!r 1d20                      - roll a 20-sided die
!r 2d8                       - roll two 8-sided dice
!r 3p6                       - roll a pool of three 6-sided dice, counting 5 or 6 as a hit
!r 2w6                       - roll two 6-sided dice and add a wild die (Savage Worlds)
!r f                         - roll four fate dice
\`\`\`


You can do multiple rolls with a single command, separated by commas:
\`\`\`
!r 1d20+1,1d8               - roll one d20, and separately roll a d8
\`\`\`



`
const helpCommands = () => `
\`\`\`
Command                    Shortcut    More Info
-----------------------------------------------------------
!honour help               (none)      !honour help
!honour roll               !r          !honour help dice
!honour draw               :d          !honour help cards
!honour private <command>  (none)      !honour help private
\`\`\`
`

const helpTypes = () => `Die types are \`d\`ie, \`p\`ool, \`w\`ild, and \`f\`ate.

Normal die rolls use \`d\`. This roll type rolls each die and adds up the result. I support rules **modifiers** for things like exploding dice and keep-the-lowest!keep-the-highest (see \`!honour help modifiers\` for more info).
\`\`\`
!r 2d20                 - roll two 20-sided dice and add up the result
\`\`\`

`

const helpModifiers = () => `
You can use keep-the-highest (\`k\`), keep-the-lowest (\`l\`), and explode (\`!\`) dice.
\`\`\`
!r 2d20k                - roll two 20-sided dice and keep the higher result
!r 2d20l                - roll two 20-sided dice and keep the lower result
!r 3d6!                 - roll three 6-sided dice, and roll another d6 for each 6
\`\`\`

When keeping the lowest or highest die, you can keep more than one:
\`\`\`
!r 3d20k2               - roll three 20-sided dice and keep the two highest
!r 3d20l2               - roll three 20-sided dice and keep the two lowest
\`\`\`


You can also combine rule modifiers. I'll execute them in order.
\`\`\`
!r d20!l                - roll an exploding d20 and keep only the lowest result
\`\`\`

For wild dice, if you need to use a wild die with a size other than d6, you can do that:
\`\`\`
!r 2w6w8                - roll two 6-sided dice and an 8-sided wild die
\`\`\`
`
`

const helpTopics = new Map([
  ['commands', helpCommands],
  ['dice', helpDice],
  ['types', helpTypes],
  ['modifiers', helpModifiers],
  ['cards', helpCards]
])
/**
 * Handles the clattr help interface.
 */
const handler = (params /*, author, guildId */) => {
  if (helpTopics.has(params)) return helpTopics.get(params)()

  return `
  You can ask for help about: ${[...helpTopics.keys()].map(topic => `\`${topic}\``).join(', ')}

  - I'll DM you with my responses. You can ask for more help in DM with \`!honour help <topic>\`
  - You can also test out commands here in DMs. Go ahead, give it a try: \`!honour roll 1d20\`

`
}

module.exports = { handler }
