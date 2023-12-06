import { defineComponent } from 'vue'

function lessen(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33 6V15H42"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M15 6V15H6"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M15 42V33H6"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M33 42V33H41.8995"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return lessen()
  }
})
