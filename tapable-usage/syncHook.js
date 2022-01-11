const { SyncHook } = require('tapable')

const accelerate = new SyncHook(['newSpeed'])

accelerate.tap('LoggerPlugin', (newSpeed) => {
  console.log('LoggerPlugin: ', `speed to ${newSpeed}`)
})

accelerate.tap('OverspeedPlugin', (newSpeed) => {
  if (newSpeed > 120) {
    console.log('OverspeedPlugin: ', 'you have overspeed')
  }
})

accelerate.tap('DamagePlugin', (newSpeed) => {
  if (newSpeed > 300) {
    console.log('DamagePlugin: ', 'speed too fast to died.')
  }
})

accelerate.call(500)
