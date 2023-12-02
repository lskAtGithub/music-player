import { defineComponent } from 'vue'

function pause(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 12V36"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32 12V36"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return pause()
  }
})
