import { defineComponent } from "vue"

function expand() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 42H6V26"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M26 6H42V22"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return expand()
  }
})